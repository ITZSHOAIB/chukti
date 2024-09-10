import path from "path";
import fs from "fs-extra";
import { checkChuktiProject } from "../utils/helpers.js";
import { log } from "../../utils/logger.js";
import { execSync } from "child_process";

export const initProject = async () => {
  try {
    log("info", "🚀 Initializing a new Chukti project with Cucumber, Anvil");

    checkChuktiProject({ shouldExist: false });
    await proceedWithInitialization();
  } catch (error) {
    log("error", `❌ Error during initialization: ${(error as Error).message}`);
    process.exit(1);
  }
};

const proceedWithInitialization = async () => {
  const currentDir = process.cwd();
  const templateDir = path.join(
    __dirname,
    "../../../../sample-projects/anvil-cucumber"
  );

  // Copy the template files to the current directory
  log("info", "📁 Copying template files...");
  fs.copySync(templateDir, currentDir);

  log("sucess", "✅ Project initialized successfully");

  // Install the dependencies
  log("info", "📦 Installing dependencies...");
  execSync("npm install", { stdio: "inherit" });
  log("info", "📦 Installing chukti...");
  execSync("npm install -D chukti", { stdio: "inherit" });
  log("sucess", "✅ Dependencies installed successfully");
};
