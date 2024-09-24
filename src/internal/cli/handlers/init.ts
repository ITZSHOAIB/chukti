import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as prompt from "@clack/prompts";
import fs from "fs-extra";
import color from "picocolors";
import type { ArgumentsCamelCase } from "yargs";
import { ProjectType } from "../../types.js";
import { handleError } from "../../utils/errorHandler.js";
import { ERROR_MESSAGES } from "../../utils/errorMessages.js";
import { getProjectType } from "../../utils/projectConfig.js";
import { version } from "../../../../package.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initProject = async (argv: ArgumentsCamelCase) => {
  try {
    prompt.intro(
      `${color.bgCyan(color.black(" 🚀 Initializing a new Chukti project "))}`,
    );
    const userChoices = await prompt.group(
      {
        folderName: () =>
          prompt.text({
            message: "Confirm the folder to initialize the project:",
            placeholder: "(Use . for the current directory)",
            initialValue: argv.folderName as string,
            defaultValue: ".",
          }),

        projectType: ({ results }) =>
          prompt.select({
            message: `Choose your chukti project setup for ${color.cyan(
              results.folderName === "."
                ? path.basename(process.cwd())
                : results.folderName,
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
      },
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
  projectPath: string,
) => {
  try {
    const commonFilesDir = path.join(
      __dirname,
      "../../../sample-projects/common",
    );
    const templateDir = path.join(
      __dirname,
      `../../../sample-projects/${projectType.toLowerCase()}`,
    );

    const spinner = prompt.spinner();

    // Copy the template files to the current directory
    spinner.start("📁 Initializing project...");
    fs.copySync(commonFilesDir, projectPath);
    fs.copySync(templateDir, projectPath);

    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = fs.readJsonSync(packageJsonPath);
    packageJson.devDependencies.chukti = `^${version}`;
    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

    spinner.stop("✅ Project initialized successfully");

    const installationChoice = await prompt.confirm({
      message: "Do you want to install the dependencies now?",
      active: "Yes",
      inactive: "No",
      initialValue: true,
    });

    if (installationChoice) {
      spinner.start("📦 Installing other dependencies...");
      execSync("npm install", { stdio: "inherit" });
      spinner.stop("✅ Dependencies installed successfully");
    } else {
      prompt.log.warn(
        color.yellow("Run `npm install` to install the dependencies"),
      );
    }

    prompt.note("npx chukti --help    \nnpx chukti test", "Try running:");

    prompt.outro("✅ Project setup complete! Happy Testing :)");
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
