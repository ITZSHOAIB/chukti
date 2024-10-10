import assert from "node:assert";
import { world } from "@cucumber/cucumber";
import { TxnStatus } from "../../../internal/types.js";
import { ERROR_MESSAGES } from "../../../internal/utils/errorMessages.js";
import { deployContract } from "../../../viem/deployContract.js";

/**
 * Attempts to deploy a contract and simulates an error for invalid arguments.
 *
 * @param args - The arguments to pass to the contract constructor.
 *
 * @example
 * import { deployContractErrorStep } from "chukti";
 *
 * When("I attempt to deploy the smart contract with invalid arguments", deployContractErrorStep);
 */
export const deployContractErrorStep = async (args: string) => {
  if (!world.chukti?.contractPath) {
    throw new Error(ERROR_MESSAGES.CONTRACT_PATH_NOT_SET);
  }

  const contractPath = world.chukti.contractPath;

  const parsedArgs = args?.trim() ? JSON.parse(args) : [];
  const activeWalletAddress = world.chukti.activeWalletAddress;

  try {
    // Attempt to deploy contract with invalid arguments
    const { deploymentStatus } = await deployContract({
      contractPath,
      args: parsedArgs,
      walletAddress: activeWalletAddress,
    });

    world.log(`Contract deployment status: ${deploymentStatus}`);
    world.chukti.deploymentStatus = deploymentStatus;
  } catch (error) {
    const errorDetails = (error as { details?: string })?.details ?? "No details available";
    world.log(`Contract deployment failed with error: ${errorDetails}`);
    world.chukti.deploymentStatus = TxnStatus.reverted;
  }
};

/**
 * Validates the error message displayed after a failed contract deployment.
 *
 * @param expectedErrorMessage - The expected error message for failed deployment.
 *
 * @example
 * import { validateDeployErrorMessageStep } from "chukti";
 *
 * Then("I should see an error message {string}", validateDeployErrorMessageStep);
 */
export const validateDeployErrorMessageStep = async (expectedErrorMessage: string) => {
  const actualErrorMessage = world.chukti?.deploymentError ?? "No error found";

  assert.strictEqual(
    actualErrorMessage,
    expectedErrorMessage,
    `Expected error message to be "${expectedErrorMessage}", but got "${actualErrorMessage}"`,
  );

  world.log(`Error message validation passed: ${actualErrorMessage}`);
};
