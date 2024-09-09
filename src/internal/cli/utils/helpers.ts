import fs from "fs-extra";
import kleur from "kleur";
import path from "path";

export const checkChuktiProject = ({
  shouldExist,
}: {
  shouldExist: boolean;
}) => {
  const chuktiConfigPath = path.join(process.cwd(), "chukti.config.ts");

  const projectExists = fs.existsSync(chuktiConfigPath);

  if (shouldExist && !projectExists) {
    console.error(
      kleur.red(
        "❌ Error: A Chukti project does not exist in this directory.\n\n"
      ) +
        kleur.yellow(
          `\tPlease run ${kleur
            .magenta()
            .bold("`chukti init`")} to initialize a new project.`
        )
    );
    process.exit(1);
  }

  if (!shouldExist && projectExists) {
    console.error(
      kleur.red("❌ Error: A Chukti project already exists in this directory.")
    );
    process.exit(1);
  }
};

export const checkEveryPathExists = (paths: string[]) => {
  const errorMessages: string[] = [];

  for (const p of paths) {
    if (!fs.existsSync(p)) {
      errorMessages.push(`❌ Error: ${kleur.cyan(p)} does not exist.`);
    }
  }

  if (errorMessages.length > 0) {
    console.error(kleur.red(errorMessages.join("\n")));
    process.exit(1);
  }
};
