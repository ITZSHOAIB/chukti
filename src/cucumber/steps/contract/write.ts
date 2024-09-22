import { world } from "@cucumber/cucumber";
import { writeContract } from "../../../viem/writeContract.js";

export const writeContractStep = async (
  functionName: string,
  args: string,
  amount: string,
) => {
  if (!world?.chukti?.deployedAddress) {
    throw new Error(
      "Deployed contract address not set. Please deploy a contract first",
    );
  }

  const contractAbi = world.chukti.contractAbi;
  const contractAddress = world.chukti.deployedAddress;

  const parsedArgs = args?.trim() ? JSON.parse(args) : [];
  const parsedAmount = amount?.trim() ? BigInt(amount) : undefined;

  const result = await writeContract({
    contractAdress: contractAddress,
    contractAbi,
    functionName,
    args: parsedArgs,
    amount: parsedAmount,
  });

  world.log(
    `${functionName} called and the transaction completed successfully`,
  );

  if (result !== undefined && result !== null) {
    world.chukti.lastResult = result;
    world.log(`Function ${functionName} returned value: ${result}`);
  }
};
