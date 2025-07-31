#!/usr/bin/env node


const updateVersion = require("../lib/updateVersion");

// Parse CLI args for version type and --stage
const args = process.argv.slice(2);
let type = "patch";
let stage = false;
for (const arg of args) {
  if (["patch", "minor", "major"].includes(arg)) type = arg;
  if (arg === "--stage") stage = true;
}

updateVersion(type, stage);
