import path from "node:path";
import fs from "fs-extra";
import type { ChuktiConfig, ProjectType } from "../types.js";

const projectTypeCache: Map<string, ProjectType> = new Map();

export const getProjectType = (projectPath: string): ProjectType | null => {
  if (projectTypeCache.has(projectPath)) {
    return projectTypeCache.get(projectPath) ?? null;
  }

  const configFilePath = path.join(projectPath, "chukti.config.json");
  if (!fs.existsSync(configFilePath)) {
    return null;
  }

  const config: ChuktiConfig = fs.readJsonSync(configFilePath);
  projectTypeCache.set(projectPath, config.projectType);
  return config.projectType;
};
