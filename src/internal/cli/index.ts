#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { initProject } from "./handlers/init.js";
import { runTests } from "./handlers/runTests.js";

yargs(hideBin(process.argv))
  .scriptName("chukti")
  .command({
    command: "init [folderName]",
    describe: "Initialize a new Chukti project",
    handler: initProject,
    aliases: ["i"],
  })
  .command({
    command: "test",
    describe: "Run Cucumber tests",
    handler: runTests,
    aliases: ["t"],
  })
  .demandCommand(1, "You need at least one command before moving on")
  .help().argv;
