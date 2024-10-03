import assert from "node:assert";
import { world } from "@cucumber/cucumber";
import { TxnStatus, type TxnStatusType } from "../../../internal/types.js";
import { ERROR_MESSAGES } from "../../../internal/utils/errorMessages.js";
import { getProjectType } from "../../../internal/utils/projectConfig.js";
import { deployContract } from "../../../viem/deployContract.js";

export const deployContractStep = async (args: string, amount: string) => {
  const projectType = getProjectType(process.cwd());
  if (projectType === null) {
    throw new Error(ERROR_MESSAGES.CHUKTI_PROJECT_NOT_FOUND);
  }

  if (!world.chukti?.contractPath) {
    throw new Error(ERROR_MESSAGES.CONTRACT_PATH_NOT_SET);
  }

  const contractPath = world.chukti.contractPath;

  const parsedArgs = args?.trim() ? JSON.parse(args) : [];
  const parsedAmount = amount?.trim() ? BigInt(amount) : undefined;
  const activeWalletAddress = world.chukti.activeWalletAddress;

  try {
    // TODO: Implement cucumber datatable for args or other strategy to properly get array of arguments
    const { deploymentStatus, deployedAddress, contractAbi } =
      await deployContract({
        contractPath,
        args: parsedArgs,
        amount: parsedAmount,
        walletAddress: activeWalletAddress,
      });

    world.log(`Contract deployment status: ${deploymentStatus}`);
    world.chukti.deploymentStatus = deploymentStatus;
    world.chukti.deployedAddress = deployedAddress;
    world.chukti.contractAbi = contractAbi;
  } catch (error) {
    const errorDetails =
      (error as { details?: string })?.details ?? "No details available";
    world.log(`Contract deployment status: ${TxnStatus.reverted}`);
    world.log(`Contract deployment error details: ${errorDetails}`);
    world.chukti.deploymentStatus = TxnStatus.reverted;
  }
};

export const validateDeploymentStep = async (status: string) => {
  if (!world?.chukti?.deploymentStatus) {
    throw new Error(
      "No deployment status found to validate. Please deploy a contract first.",
    );
  }

  const actualStatus = world.chukti.deploymentStatus;
  const expectedStatus = status.toLowerCase() as TxnStatusType;

  if (!Object.values(TxnStatus).includes(expectedStatus)) {
    throw new Error(
      `Invalid status value: ${expectedStatus}, expected ${TxnStatus.success} or ${TxnStatus.reverted}`,
    );
  }

  assert.strictEqual(
    actualStatus,
    expectedStatus,
    `Expected deployment status to be ${expectedStatus}, but got ${actualStatus}`,
  );

  world.log(`Contract deployment status is ${actualStatus} as expected`);
};
