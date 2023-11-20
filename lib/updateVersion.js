// lib/updateVersion.js
function incrementVersion(version, position) {
  const delimiter = ".";
  const array = version.split(delimiter).map(Number);
  array[position] = array[position] + 1;
  if (position < 2) array[2] = 0;
  if (position < 1) array[1] = 0;
  return array.join(delimiter);
}

function updateVersion() {
  const oldVersion = require("child_process")
    .execSync("npm pkg get version")
    .toString()
    .trim();
  const oldVersionStripped = oldVersion.replace(/"/g, "");
  const newVersion = incrementVersion(oldVersionStripped, 2);

  require("child_process").execSync(`npm pkg set version="${newVersion}"`);
}

module.exports = updateVersion;
