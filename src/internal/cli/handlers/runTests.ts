import { execSync } from "child_process";
import { log } from "../../utils/logger.js";

export const runTests = async () => {
  try {
    log("info", "🚀 Running Cucumber tests...");
    execSync("npx cucumber-js", { stdio: "inherit" });
    log("sucess", "✅ Tests completed successfully");
  } catch (error) {
    log("error", `❌ Error during tests: ${(error as Error).message}`);
    process.exit(1);
  }
};
