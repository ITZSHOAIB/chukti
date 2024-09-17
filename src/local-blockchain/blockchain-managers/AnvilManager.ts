import { type SpawnOptionsWithoutStdio, execSync } from "node:child_process";
import commandExists from "command-exists";
import { log } from "../../internal/utils/logger.js";
import { BlockchainManager } from "./BlockchainManager.js";

export class AnvilManager extends BlockchainManager {
  constructor() {
    super({ confirmationMessage: "Listening on" });
  }

  protected compileProject(): void {
    try {
      log("info", "Compiling smart contracts...");

      if (!commandExists.sync("forge")) {
        throw new Error(
          "Forge not found. Please install it before running the tests. Refer to the documentation: https://book.getfoundry.sh/getting-started/installation#using-foundryup",
        );
      }

      execSync("forge build", { stdio: "inherit" });
      log("info", "Smart contracts compiled successfully.");
    } catch (error) {
      throw new Error(`Failed to compile Anvil project: ${error}`);
    }
  }

  public async startAnvilBlockchain(timeout = 30_000): Promise<void> {
    this.compileProject();

    if (!commandExists.sync("anvil")) {
      throw new Error(
        "Anvil not found. Please install it before running the tests. Refer to the documentation: https://book.getfoundry.sh/getting-started/installation#using-foundryup",
      );
    }

    const options: SpawnOptionsWithoutStdio = {
      stdio: "pipe",
    };

    await this.startLocalBlockchain("anvil", [], options, timeout);
  }
}
