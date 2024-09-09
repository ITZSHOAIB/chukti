import fs from "fs-extra";
import path from "path";

export const isESMProject = (projectRoot: string) => {
  const packageJsonPath = path.join(projectRoot, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = require(packageJsonPath);
    if (packageJson.type === "module") {
      return true;
    }
  }

  const tsconfigPath = path.join(projectRoot, "tsconfig.json");
  if (fs.existsSync(tsconfigPath)) {
    const tsconfig = require(tsconfigPath);
    if (
      tsconfig.compilerOptions &&
      tsconfig.compilerOptions.module === "esnext"
    ) {
      return true;
    }
  }

  return false;
};
