import { getAddress, type Abi, type ReadContractReturnType } from "viem";
import { getTestClient } from "./internal/getTestClient.js";

export interface ReadContractParams {
  contractAdress: `0x${string}`;
  contractAbi: Abi;
  functionName: string;
  args?: unknown[] | undefined;
  walletAddress?: string | undefined;
}

export const readContract = async ({
  contractAdress,
  contractAbi,
  functionName,
  args,
  walletAddress,
}: ReadContractParams): Promise<ReadContractReturnType> => {
  const testClient = getTestClient();

  const senderAddress = walletAddress ? getAddress(walletAddress) : undefined;

  const data = await testClient.readContract({
    address: contractAdress,
    abi: contractAbi,
    functionName,
    args,
    account: senderAddress,
  });
  return data;
};
