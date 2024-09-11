import { execSync, spawn } from "child_process";
import commandExists from "command-exists";
import { log } from "../internal/utils/logger.js";
import { CustomError, handleError } from "../internal/utils/errorHandler.js";

let anvilProcess: any;

export const beforeAll = async () => {
  try {
    log("info", "🚀 Starting test environment...");

    const forgeExist = commandExists.sync("forge");
    if (!forgeExist) {
      throw new CustomError(
        "Forge is not installed. Please install it first. Refer to the documentation: https://github.com/ITZSHOAIB/chukti#readme"
      );
    }

    execSync("forge build", { stdio: "inherit" });

    const isAnvilExist = commandExists.sync("anvil");
    if (!isAnvilExist) {
      throw new CustomError(
        "Anvil is not installed. Please install it first. Refer to the documentation: https://github.com/ITZSHOAIB/chukti#readme"
      );
    }

    await startAnvil();
  } catch (error) {
    handleError(error as Error);
  }
};

export const afterAll = () => {
  if (anvilProcess) {
    anvilProcess.kill();
    anvilProcess.stdout.removeAllListeners();
    anvilProcess.stderr.removeAllListeners();
    anvilProcess.removeAllListeners();
    log("info", "Local blockchain stopped");
  }
};

const startAnvil = async (
  retries: number = 5,
  delay: number = 1000
): Promise<void> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      anvilProcess = spawn("anvil", { stdio: "pipe" });

      let stdio = "";
      let stderr = "";

      anvilProcess.stdout.on("data", (data: Buffer) => {
        stdio += data.toString();
        if (stdio.includes("Listening on")) {
          log("success", "✅ Anvil started successfully");
          return;
        }
      });

      anvilProcess.stderr.on("data", (data: Buffer) => {
        stderr += data.toString();
      });

      anvilProcess.on("close", (code: number) => {
        if (code !== 0) {
          throw new CustomError(
            `Anvil process exited with code ${code}: ${stderr}`
          );
        }
      });

      await new Promise((resolve) => setTimeout(resolve, delay));

      if (stdio.includes("Listening on")) {
        return;
      } else {
        throw new CustomError("Anvil did not start successfully");
      }
    } catch (error) {
      log(
        "warning",
        `⚠️ Attempt ${attempt} to start Anvil failed: ${
          (error as Error).message
        }`
      );
      if (attempt === retries) {
        handleError(
          new CustomError(`Failed to start Anvil after ${retries} attempts`)
        );
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
