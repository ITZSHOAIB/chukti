import path from "node:path";
import fs from "fs-extra";
import type { ChuktiConfig, ProjectType } from "../types.js";

export const getProjectType = (projectPath: string): ProjectType | null => {
  const configFilePath = path.join(projectPath, "chukti.config.json");

  if (fs.existsSync(configFilePath)) {
    const config: ChuktiConfig = fs.readJsonSync(configFilePath);
    return config.projectType;
  }
  return null;
};
