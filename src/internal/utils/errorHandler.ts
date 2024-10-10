import { log } from "./logger.js";

export const handleError = (error: Error) => {
  log("error", `❌ Error: ${error.message}`);
  process.exit(1);
};
