import { type SpawnOptionsWithoutStdio, execSync } from "node:child_process";
import commandExists from "command-exists";
import { log } from "../../internal/utils/logger.js";
import { BlockchainManager } from "./BlockchainManager.js";

export class HardhatManager extends BlockchainManager {
  constructor() {
    super({
      confirmationMessage: "Started HTTP and WebSocket JSON-RPC server at",
    });
  }

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
