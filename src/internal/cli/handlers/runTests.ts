import { execSync } from "child_process";
import { log } from "../../utils/logger.js";
import { CustomError, handleError } from "../../utils/errorHandler.js";

export const runTests = async () => {
  try {
    log("info", "🚀 Running Cucumber tests...");
    execSync("npx cucumber-js", { stdio: "inherit" });
    log("success", "✅ Tests completed successfully");
  } catch (error) {
    handleError(
      new CustomError(`Error before running tests: ${(error as Error).message}`)
    );
  }
};
