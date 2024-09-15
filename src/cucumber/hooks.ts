import { log } from "../internal/utils/logger.js";
import { CustomError, handleError } from "../internal/utils/errorHandler.js";
import { HardhatManager } from "../local-blockchain/blockchain-managers/HardhatManager.js";
import { AnvilManager } from "../local-blockchain/blockchain-managers/AnvilManager.js";
import { getProjectType } from "../internal/utils/projectConfig.js";
import { ProjectType } from "../internal/types.js";

let blockchainManager: HardhatManager | AnvilManager;

export const beforeAll = async () => {
  try {
    log("info", "🚀 Starting test environment...");

    const projectType = getProjectType(process.cwd());
    if (!projectType) {
      throw new CustomError(
        "No Chukti project found in the current directory."
      );
    }

    if (projectType === ProjectType.HardhatViem) {
      blockchainManager = new HardhatManager();
      await blockchainManager.startHardhatBlockchain();
    } else if (projectType === ProjectType.ForgeAnvil) {
      blockchainManager = new AnvilManager();
      await blockchainManager.startAnvilBlockchain();
    } else {
      throw new CustomError(
        "Unsupported project type. Please check chukti.config.json"
      );
    }
  } catch (error) {
    handleError(error as Error);
  }
};

export const afterAll = () => {
  if (blockchainManager) {
    blockchainManager.stopLocalBlockchain();
  }
};
