import { log } from "./logger.js";

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export const handleError = (error: Error) => {
  log("error", `❌ Error: ${error.message}`);
  process.exit(1);
};
