import {
  spawn,
  ChildProcessWithoutNullStreams,
  SpawnOptionsWithoutStdio,
} from "child_process";
import { log } from "../utils/logger.js";
import { CustomError } from "../utils/errorHandler.js";
import kill from "tree-kill";

interface BlockchainManagerOptions {
  confirmationMessage: string;
}

export abstract class BlockchainManager {
  private blockchainProcess: ChildProcessWithoutNullStreams | null = null;
  private serverConfirmationMessage: string;
  private stdio = "";
  private stderr = "";
  private blockchainStarted = false;

  constructor({ confirmationMessage }: BlockchainManagerOptions) {
    this.serverConfirmationMessage = confirmationMessage;
  }

  public async startLocalBlockchain(
    spawnCommand: string,
    args: string[],
    options: SpawnOptionsWithoutStdio,
    timeout: number = 30_000
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.blockchainProcess = spawn(spawnCommand, args, options);

      this.blockchainProcess.stdout.on("data", this.onData(resolve));
      this.blockchainProcess.stderr.on("data", this.onError);
      this.blockchainProcess.on("close", this.onClose(reject));

      setTimeout(() => {
        if (!this.blockchainStarted) {
          this.stopLocalBlockchain();
          reject(
            new CustomError(
              "Local blockchain did not start within the timeout period"
            )
          );
        }
      }, timeout);
    });
  }

  public stopLocalBlockchain() {
    if (this.blockchainProcess) {
      console.log("Killing process", this.blockchainProcess.killed);
      if (!this.blockchainProcess.killed) {
        kill(this.blockchainProcess.pid!);
      }
      this.cleanupListeners();
      this.blockchainProcess.off("close", this.onClose);
      this.blockchainProcess = null;
      log("info", "Local blockchain stopped");
    }
  }

  private cleanupListeners = () => {
    if (this.blockchainProcess) {
      this.blockchainProcess.stdout.off("data", this.onData);
      this.blockchainProcess.stderr.off("data", this.onError);
    }
  };

  private onData = (resolve: () => void) => (data: Buffer) => {
    this.stdio += data.toString();
    if (
      this.stdio.includes(this.serverConfirmationMessage) &&
      !this.blockchainStarted
    ) {
      log("success", "🚀 Local blockchain started successfully");
      this.blockchainStarted = true;
      this.cleanupListeners();
      resolve();
    }
  };

  private onError = (data: Buffer) => {
    this.stderr += data.toString();
  };

  private onClose = (reject: (reason?: any) => void) => (code: number) => {
    this.cleanupListeners();
    if (code !== 0) {
      reject(
        new CustomError(
          `Local blockchain process exited with code ${code}: ${this.stderr}`
        )
      );
    } else if (!this.blockchainStarted) {
      reject(
        new CustomError(
          `Local blockchain did not start within the timeout period: ${this.stderr}`
        )
      );
    }
  };
}
