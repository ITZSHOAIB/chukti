import { type SpawnOptionsWithoutStdio, execSync } from "node:child_process";
import commandExists from "command-exists";
import { log } from "../../internal/utils/logger.js";
import { BlockchainManager } from "./BlockchainManager.js";

/**
 * A class that manages the Hardhat blockchain.
 *
 * This class extends the {@link BlockchainManager} class and provides
 * functionality to manage the Hardhat blockchain.
 *
 * @example
 * import { HardhatManager } from "chukti";
 *
 * const hardhatManager = new HardhatManager();
 * hardhatManager.startHardhatBlockchain();
 */
export class HardhatManager extends BlockchainManager {
  constructor() {
    super({
      confirmationMessage: "Started HTTP and WebSocket JSON-RPC server at",
    });
  }

  /**
   * Compiles the Hardhat project.
   *
   * This function compiles the smart contracts in the Hardhat project.
   */
  compileProject(): void {
    try {
      log("info", "Compiling smart contracts...");

      if (!commandExists.sync("npx")) {
        throw new Error(
          "npx not found. Please install it before running the tests.",
        );
      }

      execSync("npx hardhat compile", { stdio: "inherit" });
      log("info", "Smart Contracts compiled successfully.");
    } catch (error) {
      throw new Error(`Failed to compile smart contracts: ${error}`);
    }
  }

  /**
   * Starts the Hardhat blockchain.
   *
   * This function starts the Hardhat blockchain using the `npx hardhat node` command.
   *
   * @param timeout - The timeout for starting the blockchain.
   * @default 30_000
   */
  public async startHardhatBlockchain(timeout = 30_000): Promise<void> {
    this.compileProject();

    const isWindows = process.platform === "win32";
    const npxPath = isWindows ? "npx" : execSync("which npx").toString().trim();

    const args = ["hardhat", "node"];
    const options: SpawnOptionsWithoutStdio = {
      cwd: process.cwd(),
      env: {
        ...process.env,
        HARDHAT_DISABLE_TELEMETRY_PROMPT: "true",
      },
      stdio: "pipe",
    };

    await this.startLocalBlockchain(npxPath, args, options, timeout);
  }
}
