import { world } from "@cucumber/cucumber";
import { ERROR_MESSAGES } from "../../../internal/utils/errorMessages.js";
import { writeContract } from "../../../viem/writeContract.js";

export const writeContractStep = async (
  functionName: string,
  args: string,
  amount: string,
) => {
  if (!world?.chukti?.deployedAddress) {
    throw new Error(ERROR_MESSAGES.NO_CONTRACT_DEPLOYMENT_FOUND);
  }

  const contractAbi = world.chukti.contractAbi;
  const contractAddress = world.chukti.deployedAddress;

  const parsedArgs = args?.trim() ? JSON.parse(args) : [];
  const parsedAmount = amount?.trim() ? BigInt(amount) : undefined;

  const { result, txnHash } = await writeContract({
    contractAdress: contractAddress,
    contractAbi,
    functionName,
    args: parsedArgs,
    amount: parsedAmount,
  });

  world.chukti.lastTxnHash = txnHash;

  world.log(`${functionName} called and the transaction hash is: ${txnHash}`);

  if (result !== undefined && result !== null) {
    world.chukti.lastResult = result;
    world.log(`Function ${functionName} returned value: ${result}`);
  }
};
