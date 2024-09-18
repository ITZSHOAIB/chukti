import type { Abi, ReadContractReturnType } from "viem";
import { getTestClient } from "./internal/getTestClient.js";

export interface ReadContractParams {
  contractAdress: `0x${string}`;
  contractAbi: Abi;
  functionName: string;
  args: unknown[];
}

export const readContract = async ({
  contractAdress,
  contractAbi,
  functionName,
  args,
}: ReadContractParams): Promise<ReadContractReturnType> => {
  const testClient = getTestClient();

  const data = await testClient.readContract({
    address: contractAdress,
    abi: contractAbi,
    functionName: functionName,
    args: args,
  });

  return data;
};
