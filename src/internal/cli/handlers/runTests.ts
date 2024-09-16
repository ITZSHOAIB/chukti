import { execSync } from "child_process";
import { log } from "../../utils/logger.js";
import { handleError } from "../../utils/errorHandler.js";

export const runTests = async () => {
  try {
    log("info", "🚀 Running Cucumber tests...");
    execSync("npx cucumber-js", { stdio: "inherit" });
    log(
      "success",
      "✅ Tests completed successfully. \n\n\tCheck out the report at test-reports/test-report.html"
    );
  } catch (error) {
    handleError(
      new Error(`Error before running tests: ${(error as Error).message}`)
    );
  }
};
