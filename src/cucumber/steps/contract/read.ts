import { world } from "@cucumber/cucumber";
import { ERROR_MESSAGES } from "../../../internal/utils/errorMessages.js";
import { readContract } from "../../../viem/readContract.js";

/**
 * Reads the contract function using the provided arguments.
 *
 * @param functionName - The name of the function to call.
 * @param args - The arguments to pass to the contract function.
 *
 * @example
 * import { readContractStep } from "chukti";
 *
 * When("I call the read function {string} from the contract with arguments {string}", readContractStep);
 */
export const readContractStep = async (functionName: string, args: string) => {
  if (!world?.chukti?.deployedAddress) {
    throw new Error(ERROR_MESSAGES.NO_CONTRACT_DEPLOYMENT_FOUND);
  }

  const contractAbi = world.chukti.contractAbi;
  const contractAddress = world.chukti.deployedAddress;

  const parsedArgs = args?.trim() ? JSON.parse(args) : [];
  const activeWalletAddress = world.chukti.activeWalletAddress;

  const data = await readContract({
    contractAdress: contractAddress,
    contractAbi,
    functionName,
    args: parsedArgs,
    walletAddress: activeWalletAddress,
  });

  world.chukti.lastResult = data;
  world.log(`${functionName} called and got the result: ${data}`);
};
