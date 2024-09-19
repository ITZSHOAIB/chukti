import type { Abi } from "viem";
import { getTestClient } from "./internal/getTestClient.js";

export interface WriteContractParams {
  contractAdress: `0x${string}`;
  contractAbi: Abi;
  functionName: string;
  args?: unknown[] | undefined;
  amount?: bigint | undefined;
}

export const writeContract = async ({
  contractAdress,
  contractAbi,
  functionName,
  args,
  amount,
}: WriteContractParams): Promise<`0x${string}`> => {
  const testClient = getTestClient();

  const testAddresses = await testClient.getAddresses();
  const deployedAddress = testAddresses[0];

  const { request } = await testClient.simulateContract({
    address: contractAdress,
    abi: contractAbi,
    functionName,
    args,
    account: deployedAddress,
    value: amount,
  });

  return await testClient.writeContract(request);
};
