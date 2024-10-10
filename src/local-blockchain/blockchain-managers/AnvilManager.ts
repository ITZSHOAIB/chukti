import { type SpawnOptionsWithoutStdio, execSync } from "node:child_process";
import commandExists from "command-exists";
import { log } from "../../internal/utils/logger.js";
import { BlockchainManager } from "./BlockchainManager.js";

/**
 * A class that manages the Anvil blockchain.
 *
 * This class extends the {@link BlockchainManager} class and provides
 * functionality to manage the Anvil blockchain.
 *
 * @example
 * import { AnvilManager } from "chukti";
 *
 * const anvilManager = new AnvilManager();
 * anvilManager.startAnvilBlockchain();
 */
export class AnvilManager extends BlockchainManager {
  constructor() {
    super({ confirmationMessage: "Listening on" });
  }

  /**
   * Compiles the Anvil project.
   *
   * This function compiles the smart contracts in the Anvil project.
   */
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

  /**
   * Starts the Anvil blockchain.
   *
   * This function starts the Anvil blockchain using the `anvil` command.
   *
   * @param timeout - The timeout for starting the blockchain.
   * @default 30_000
   */
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
