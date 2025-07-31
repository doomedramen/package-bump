// lib/updateVersion.js

function incrementVersion(version, position) {
  const delimiter = ".";
  const array = version.split(delimiter).map(Number);
  array[position] = array[position] + 1;
  if (position < 2) array[2] = 0;
  if (position < 1) array[1] = 0;
  return array.join(delimiter);
}

/**
 * @param {"patch"|"minor"|"major"} [type] - Version bump type
 * @param {boolean} [stage] - Whether to re-stage package.json
 */
function updateVersion(type = "patch", stage = false) {
  const pos = type === "major" ? 0 : type === "minor" ? 1 : 2;
  const path = require("path");
  const fs = require("fs");
  // Find the nearest package.json upwards from CWD
  let dir = process.cwd();
  let pkgPath = null;
  while (dir !== "/") {
    const candidate = path.join(dir, "package.json");
    if (fs.existsSync(candidate)) {
      pkgPath = candidate;
      break;
    }
    dir = path.dirname(dir);
  }
  if (!pkgPath) throw new Error("package.json not found");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const oldVersion = pkg.version;
  const newVersion = incrementVersion(oldVersion, pos);
  pkg.version = newVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  if (stage) {
    try {
      require("child_process").execSync(`git add "${pkgPath}"`);
    } catch {
      // ignore if not a git repo
    }
  }
}

module.exports = updateVersion;
