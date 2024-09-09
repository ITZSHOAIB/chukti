import kleur from "kleur";
import path from "path";
import fs from "fs-extra";
import { checkChuktiProject } from "../utils/helpers.js";

export const initProject = async () => {
  try {
    console.log(
      kleur.cyan("🚀 Initializing a new Chukti project with Cucumber, Anvil")
    );

    checkChuktiProject({ shouldExist: false });
    await proceedWithInitialization();
  } catch (error) {
    console.error(
      kleur.red(`❌ Error during initialization: ${(error as Error).message}`)
    );
    process.exit(1);
  }
};

const proceedWithInitialization = async () => {
  const currentDir = process.cwd();
  const templateDir = path.join(
    __dirname,
    "../../../sample-projects/anvil-cucumber"
  );

  // Copy the template files to the current directory
  console.log(kleur.cyan("📁 Copying template files..."));
  fs.copySync(templateDir, currentDir);

  console.log(kleur.green("✅ Project initialized successfully"));

  // Install the dependencies
  console.log(kleur.yellow("📦 Installing dependencies..."));
  const { execa } = await import("execa");
  await execa("npm", ["install"], { stdio: "inherit" });
};
