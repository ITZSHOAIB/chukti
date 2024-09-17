import { ProjectType } from "../internal/types.js";
import { handleError } from "../internal/utils/errorHandler.js";
import { ERROR_MESSAGES } from "../internal/utils/errorMessages.js";
import { log } from "../internal/utils/logger.js";
import { getProjectType } from "../internal/utils/projectConfig.js";
import { AnvilManager } from "../local-blockchain/blockchain-managers/AnvilManager.js";
import { HardhatManager } from "../local-blockchain/blockchain-managers/HardhatManager.js";

let blockchainManager: HardhatManager | AnvilManager;

export const beforeAll = async () => {
  try {
    log("info", "🚀 Starting test environment...");

    const projectType = getProjectType(process.cwd());
    if (!projectType) {
      throw new Error(ERROR_MESSAGES.CHUKTI_PROJECT_NOT_FOUND);
    }

    if (projectType === ProjectType.HardhatViem) {
      blockchainManager = new HardhatManager();
      await blockchainManager.startHardhatBlockchain();
    } else if (projectType === ProjectType.ForgeAnvil) {
      blockchainManager = new AnvilManager();
      await blockchainManager.startAnvilBlockchain();
    } else {
      throw new Error(
        ERROR_MESSAGES.UNSUPPORTED_PROJECT_TYPE(projectType as string),
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
