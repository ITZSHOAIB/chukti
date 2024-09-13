import { execSync, spawn, SpawnOptionsWithoutStdio } from "child_process";
import commandExists from "command-exists";
import { log } from "../internal/utils/logger.js";
import { CustomError, handleError } from "../internal/utils/errorHandler.js";
import kill from "tree-kill";

let blockchainProcess: any = null;
const serverConfirmationMessage =
  "Started HTTP and WebSocket JSON-RPC server at";

export const beforeAll = async () => {
  try {
    log("info", "🚀 Starting test environment...");

    const isWindows = process.platform === "win32";

    const isNpxExist = commandExists.sync("npx");
    if (!isNpxExist) {
      throw new CustomError(
        "npx command not found. Please install Node.js to get npx. Refer to the documentation: https://nodejs.org/en/download/"
      );
    }

    const npxPath = isWindows
      ? "npx.cmd"
      : execSync("which npx").toString().trim();

    execSync(`${npxPath} hardhat compile`, { stdio: "inherit" });

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

    await startLocalBlockchain(npxPath, args, options);
  } catch (error) {
    handleError(error as Error);
  }
};

export const afterAll = () => {
  closeLocalBlockchain();
};

const startLocalBlockchain = async (
  spawnCommand: string,
  args: string[],
  options: SpawnOptionsWithoutStdio,
  retries: number = 5,
  delay: number = 30000
): Promise<void> => {
  let blockchainStarted = false;

  blockchainProcess = spawn(spawnCommand, args, options);

  let stdio = "";
  let stderr = "";

  const onData = (data: Buffer) => {
    stdio += data.toString();
    if (stdio.includes(serverConfirmationMessage) && !blockchainStarted) {
      log("success", "🚀 Local blockchain started successfully");
      blockchainStarted = true;
      cleanupListeners();
    }
  };

  const onError = (data: Buffer) => {
    stderr += data.toString();
  };

  const onClose = (code: number) => {
    if (code !== 0) {
      throw new CustomError(
        `Local blockchain process exited with code ${code}: ${stderr}`
      );
    }
  };

  blockchainProcess.stdout.on("data", onData);
  blockchainProcess.stderr.on("data", onError);
  blockchainProcess.on("close", onClose);
  process.on("exit", () => {
    closeLocalBlockchain();
  });

  for (let attempt = 1; attempt <= retries; attempt++) {
    if (blockchainStarted) {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, delay));
      log(
        "info",
        `🚀 Starting Local Blockchain... Attempt ${attempt}/${retries}`
      );
    }
  }
};

const cleanupListeners = () => {
  if (blockchainProcess) {
    blockchainProcess.stdout?.removeAllListeners();
    blockchainProcess.stderr?.removeAllListeners();
    blockchainProcess.removeAllListeners();
  }
};

const closeLocalBlockchain = () => {
  if (blockchainProcess && !blockchainProcess.killed) {
    kill(blockchainProcess.pid);
    cleanupListeners();
    blockchainProcess = null;
    log("info", "Local blockchain stopped");
  }
};
