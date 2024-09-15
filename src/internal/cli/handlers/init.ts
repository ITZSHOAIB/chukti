import path from "path";
import fs from "fs-extra";
import { getProjectType } from "../../utils/projectConfig.js";
import { log } from "../../utils/logger.js";
import { execSync } from "child_process";
import { handleError, CustomError } from "../../utils/errorHandler.js";
import inquirer from "inquirer";
import { ArgumentsCamelCase } from "yargs";
import { ProjectType } from "../../types.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initProject = async (argv: ArgumentsCamelCase) => {
  try {
    log("info", "🚀 Initializing a new Chukti project with Cucumber");

    let folderName: string = argv.folderName as string;
    if (folderName === undefined) {
      const { folderNameInput } = await inquirer.prompt([
        {
          type: "input",
          name: "folderNameInput",
          message:
            "Enter the folder name to initialize the project (hit Enter to use current directory.):",
          default: ".",
        },
      ]);
      folderName = folderNameInput;
    }

    const projectPath =
      folderName === "."
        ? process.cwd()
        : path.join(process.cwd(), folderName.toString());

    if (folderName !== ".") {
      fs.ensureDirSync(projectPath);
    }
    process.chdir(projectPath);

    if (getProjectType(projectPath)) {
      throw new CustomError(
        "A Chukti project already exists in this directory."
      );
    }

    const { projectType } = await inquirer.prompt([
      {
        type: "list",
        name: "projectType",
        message: "Choose your chukti project setup:",
        choices: [
          {
            name: "A TypeScript project with Hardhat + Viem",
            value: ProjectType.HardhatViem,
          },
          {
            name: "A Typescript project with Forge + Anvil (should be installed manually)",
            value: ProjectType.ForgeAnvil,
          },
        ],
      },
    ]);

    await proceedWithInitialization(projectType, projectPath);
  } catch (error) {
    handleError(error as Error);
  }
};

const proceedWithInitialization = async (
  projectType: string,
  projectPath: string
) => {
  try {
    const commonFilesDir = path.join(
      __dirname,
      "../../../sample-projects/common"
    );
    const templateDir = path.join(
      __dirname,
      `../../../sample-projects/${projectType.toLowerCase()}`
    );

    // Copy the template files to the current directory
    log("info", "📁 Copying template files...");
    fs.copySync(commonFilesDir, projectPath);
    fs.copySync(templateDir, projectPath);

    log("success", "✅ Project initialized successfully");

    // Install the dependencies
    log("info", "📦 Installing chukti...");
    execSync("npm install -D chukti", { stdio: "inherit" });

    log("info", "📦 Installing dependencies...");
    execSync("npm install", { stdio: "inherit" });

    log("success", "✅ Dependencies installed successfully");
  } catch (error) {
    throw new CustomError((error as Error).message);
  }
};
