import path from "path";
import { ChuktiConfig, ProjectType } from "../types.js";
import fs from "fs-extra";

export const getProjectType = (projectPath: string): ProjectType | null => {
  const configFilePath = path.join(projectPath, "chukti.config.json");
  if (fs.existsSync(configFilePath)) {
    const config: ChuktiConfig = fs.readJsonSync(configFilePath);
    return config.projectType;
  }
  return null;
};
