import { ProjectType } from "../types.js";

export const ERROR_MESSAGES = {
  CHUKTI_PROJECT_NOT_FOUND:
    "No Chukti project found in the current directory. Please run 'chukti init' to create a new Chukti project.",
  CONTRACT_PATH_NOT_SET: "Contract path not set. Please set the contract path",
  CHUKTI_PROJECT_ALREADY_EXISTS:
    "A Chukti project already exists in this directory.",
  UNSUPPORTED_PROJECT_TYPE: (projectType: string) =>
    `Unsupported project type: ${projectType}. Please check chukti.config.json. Supported project types are [${Object.values(
      ProjectType
    ).join(", ")}]`,
};
