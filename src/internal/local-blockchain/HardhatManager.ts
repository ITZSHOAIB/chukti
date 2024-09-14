import { execSync, SpawnOptionsWithoutStdio } from "child_process";
import { BlockchainManager } from "./BlockchainManager.js";
import { log } from "../utils/logger.js";
import { CustomError } from "../utils/errorHandler.js";

export class HardhatManager extends BlockchainManager {
  constructor() {
    super({
      confirmationMessage: "Started HTTP and WebSocket JSON-RPC server at",
    });
  }

  compileProject(): void {
    try {
      log("info", "Compiling Hardhat project...");
      const isWindows = process.platform === "win32";
      const npxPath = isWindows
        ? "npx.cmd"
        : execSync("which npx").toString().trim();
      execSync(`${npxPath} hardhat compile`, { stdio: "inherit" });
      log("info", "Hardhat project compiled successfully.");
    } catch (error) {
      throw new CustomError("Failed to compile Hardhat project: " + error);
    }
  }

  public async startHardhatBlockchain(timeout: number = 30_000): Promise<void> {
    this.compileProject();

    const isWindows = process.platform === "win32";
    const npxPath = isWindows
      ? "npx.cmd"
      : execSync("which npx").toString().trim();

    const args = ["hardhat", "node"];
    const options: SpawnOptionsWithoutStdio = {
      cwd: process.cwd(),
      env: {
        ...process.env,
        HARDHAT_EXPERIMENTAL_ALLOW_NON_LOCAL_INSTALLATION: "true",
      },
      stdio: "pipe",
      shell: isWindows,
    };

    await this.startLocalBlockchain(npxPath, args, options, timeout);
  }
}
