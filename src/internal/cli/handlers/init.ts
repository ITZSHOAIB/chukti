import path from "path";
import fs from "fs-extra";
import { checkChuktiProject } from "../utils/helpers.js";
import { log } from "../../utils/logger.js";
import { execSync } from "child_process";
import { handleError, CustomError } from "../../utils/errorHandler.js";

export const initProject = async () => {
  try {
    log("info", "🚀 Initializing a new Chukti project with Cucumber, Anvil");

    checkChuktiProject({ shouldExist: false });
    await proceedWithInitialization();
  } catch (error) {
    handleError(error as Error);
  }
};

const proceedWithInitialization = async () => {
  try {
    const currentDir = process.cwd();
    const templateDir = path.join(
      __dirname,
      "../../../../sample-projects/hardhat-viem"
    );

    // Copy the template files to the current directory
    log("info", "📁 Copying template files...");
    fs.copySync(templateDir, currentDir);

    log("success", "✅ Project initialized successfully");

    // Install the dependencies
    log("info", "📦 Installing dependencies...");
    execSync("npm install", { stdio: "inherit" });
    log("info", "📦 Installing chukti...");
    execSync("npm install -D chukti", { stdio: "inherit" });
    log("success", "✅ Dependencies installed successfully");
  } catch (error) {
    throw new CustomError((error as Error).message);
  }
};
