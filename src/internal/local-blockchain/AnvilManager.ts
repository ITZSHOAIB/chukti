import { execSync, SpawnOptionsWithoutStdio } from "child_process";
import { BlockchainManager } from "./BlockchainManager.js";
import { log } from "../utils/logger.js";
import { CustomError } from "../utils/errorHandler.js";
import commandExists from "command-exists";

export class AnvilManager extends BlockchainManager {
  constructor() {
    super({ confirmationMessage: "Listening on" });
  }

  protected compileProject(): void {
    try {
      log("info", "Compiling smart contracts...");

      if (!commandExists.sync("forge")) {
        throw new CustomError(
          "Forge not found. Please install it before running the tests. Refer to the documentation: https://github.com/ITZSHOAIB/chukti#readme"
        );
      }

      execSync("forge build", { stdio: "inherit" });
      log("info", "Smart contracts compiled successfully.");
    } catch (error) {
      throw new CustomError("Failed to compile Anvil project: " + error);
    }
  }

  public async startAnvilBlockchain(timeout: number = 30_000): Promise<void> {
    this.compileProject();

    if (!commandExists.sync("anvil")) {
      throw new CustomError(
        "Anvil not found. Please install it before running the tests. Refer to the documentation: https://github.com/ITZSHOAIB/chukti#readme"
      );
    }

    const options: SpawnOptionsWithoutStdio = {
      stdio: "pipe",
    };

    await this.startLocalBlockchain("anvil", [], options, timeout);
  }
}
