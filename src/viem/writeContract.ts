import { getAddress, type Abi } from "viem";
import { getTestClient } from "./internal/getTestClient.js";

export interface WriteContractParams {
  contractAdress: `0x${string}`;
  contractAbi: Abi;
  functionName: string;
  args?: unknown[] | undefined;
  amount?: bigint | undefined;
  walletAddress?: string | undefined;
}

export interface WriteContractResult {
  result: unknown;
  txnHash: `0x${string}`;
}

export const writeContract = async ({
  contractAdress,
  contractAbi,
  functionName,
  args,
  amount,
  walletAddress,
}: WriteContractParams): Promise<WriteContractResult> => {
  const testClient = getTestClient();

  const testAddresses = await testClient.getAddresses();
  const senderAddress = walletAddress
    ? getAddress(walletAddress)
    : testAddresses[0];

  const { request, result } = await testClient.simulateContract({
    address: contractAdress,
    abi: contractAbi,
    functionName,
    args,
    account: senderAddress,
    value: amount,
  });

  const txnHash = await testClient.writeContract(request);

  return { result, txnHash };
};
