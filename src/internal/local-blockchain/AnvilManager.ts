import { execSync, SpawnOptionsWithoutStdio } from "child_process";
import { BlockchainManager } from "./BlockchainManager.js";
import { log } from "../utils/logger.js";
import { CustomError } from "../utils/errorHandler.js";

export class AnvilManager extends BlockchainManager {
  constructor() {
    super({ confirmationMessage: "Listening on" });
  }

  protected compileProject(): void {
    try {
      log("info", "Compiling Anvil project...");
      execSync("forge build", { stdio: "inherit" });
      log("info", "Anvil project compiled successfully.");
    } catch (error) {
      throw new CustomError("Failed to compile Anvil project: " + error);
    }
  }

  public async startAnvilBlockchain(timeout: number = 30_000): Promise<void> {
    this.compileProject();

    const args = ["anvil"];
    const options: SpawnOptionsWithoutStdio = {
      cwd: process.cwd(),
      env: process.env,
      stdio: "pipe",
    };

    await this.startLocalBlockchain("anvil", args, options, timeout);
  }
}
