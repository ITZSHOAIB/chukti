import fs from "fs-extra";
import path from "path";
import { log } from "../../utils/logger.js";

export const checkChuktiProject = ({
  shouldExist,
}: {
  shouldExist: boolean;
}) => {
  const chuktiConfigPath = path.join(process.cwd(), "chukti.config.ts");

  const projectExists = fs.existsSync(chuktiConfigPath);

  if (shouldExist && !projectExists) {
    log(
      "error",
      "❌ Error: A Chukti project does not exist in this directory.\n\nPlease run `chukti init` to initialize a new project."
    );

    process.exit(1);
  }

  if (!shouldExist && projectExists) {
    log(
      "error",
      "❌ Error: A Chukti project already exists in this directory."
    );

    process.exit(1);
  }
};

export const checkEveryPathExists = (paths: string[]) => {
  const errorMessages: string[] = [];

  for (const p of paths) {
    if (!fs.existsSync(p)) {
      errorMessages.push(`❌ Error: ${p} does not exist.`);
    }
  }

  if (errorMessages.length > 0) {
    log("error", errorMessages.join("\n"));
    process.exit(1);
  }
};
