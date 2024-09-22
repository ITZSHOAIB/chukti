import { world } from "@cucumber/cucumber";
import { readContract } from "../../../viem/readContract.js";

export const readContractStep = async (functionName: string, args: string) => {
  if (!world?.chukti?.deployedAddress) {
    throw new Error(
      "Deployed contract address not set. Please deploy a contract first",
    );
  }

  const contractAbi = world.chukti.contractAbi;
  const contractAddress = world.chukti.deployedAddress;

  const parsedArgs = args?.trim() ? JSON.parse(args) : [];

  const data = await readContract({
    contractAdress: contractAddress,
    contractAbi,
    functionName,
    args: parsedArgs,
  });

  world.chukti.lastResult = data;
  world.log(`${functionName} called and got the result: ${data}`);
};
