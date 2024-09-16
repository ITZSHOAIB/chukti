import path from "path";
import fs from "fs-extra";
import { getProjectType } from "../../utils/projectConfig.js";
import { execSync } from "child_process";
import { handleError } from "../../utils/errorHandler.js";
import { ArgumentsCamelCase } from "yargs";
import { ProjectType } from "../../types.js";
import { fileURLToPath } from "url";
import { ERROR_MESSAGES } from "../../utils/errorMessages.js";
import * as prompt from "@clack/prompts";
import color from "picocolors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initProject = async (argv: ArgumentsCamelCase) => {
  try {
    prompt.intro(
      `${color.bgCyan(
        color.black(" 🚀 Initializing a new Chukti project with Cucumber ")
      )}`
    );
    const userChoices = await prompt.group(
      {
        folderName: () =>
          prompt.text({
            message: "Confirm the folder name to initialize the project:",
            placeholder: "(Use . for the current directory)",
            initialValue: argv.folderName as string,
            defaultValue: ".",
          }),

        projectType: ({ results }) =>
          prompt.select({
            message: `Choose your chukti project setup for ${color.cyan(
              results.folderName === "."
                ? path.basename(process.cwd())
                : results.folderName
            )}:`,
            options: [
              {
                value: ProjectType.HardhatViem,
                label: "A TypeScript project with Hardhat + Viem",
              },
              {
                value: ProjectType.ForgeAnvil,
                label: "A Typescript project with Forge + Anvil",
                hint: "should be installed manually",
              },
            ],
          }),
      },
      {
        onCancel: () => {
          prompt.cancel("Project intialization cancelled.");
          process.exit(0);
        },
      }
    );

    const { folderName, projectType } = userChoices;
    const projectPath = path.join(process.cwd(), folderName.toString());

    if (folderName !== ".") {
      fs.ensureDirSync(projectPath);
    }
    process.chdir(projectPath);

    if (getProjectType(projectPath)) {
      throw new Error(ERROR_MESSAGES.CHUKTI_PROJECT_ALREADY_EXISTS);
    }

    await proceedWithInitialization(projectType as string, projectPath);
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

    const spinner = prompt.spinner();

    // Copy the template files to the current directory
    spinner.start("📁 Initializing project...");
    fs.copySync(commonFilesDir, projectPath);
    fs.copySync(templateDir, projectPath);
    spinner.stop("✅ Project initialized successfully");

    // Install the dependencies
    spinner.start("📦 Installing chukti...");
    execSync("npm install -D chukti", { stdio: "inherit" });
    spinner.stop("✅ Chukti installed successfully");

    spinner.start("📦 Installing other dependencies...");
    execSync("npm install", { stdio: "inherit" });
    spinner.stop("✅ Dependencies installed successfully");

    prompt.note(`npx chukti --help    \nnpx chukti test`, "Try running:");

    prompt.outro("✅ Project setup complete! Happy Testing :)");
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
