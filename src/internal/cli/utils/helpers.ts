import fs from "fs-extra";
import path from "path";
import { CustomError, handleError } from "../../utils/errorHandler.js";

export const checkChuktiProject = ({
  shouldExist,
}: {
  shouldExist: boolean;
}) => {
  try {
    const chuktiConfigPath = path.join(process.cwd(), "chukti.config.ts");
    const projectExists = fs.existsSync(chuktiConfigPath);

    if (shouldExist && !projectExists) {
      throw new CustomError(
        "A Chukti project does not exist in this directory. Please run `chukti init` to initialize a new project."
      );
    }

    if (!shouldExist && projectExists) {
      throw new CustomError(
        "A Chukti project already exists in this directory."
      );
    }
  } catch (error) {
    handleError(error as Error);
  }
};

export const checkEveryPathExists = (paths: string[]) => {
  try {
    const errorMessages: string[] = [];

    for (const p of paths) {
      if (!fs.existsSync(p)) {
        errorMessages.push(`❌ Error: ${p} does not exist.`);
      }
    }

    if (errorMessages.length > 0) {
      throw new CustomError(errorMessages.join("\n"));
    }
  } catch (error) {
    handleError(error as Error);
  }
};
