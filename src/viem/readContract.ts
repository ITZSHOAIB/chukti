import { type Abi, type ReadContractReturnType, getAddress } from "viem";
import { getTestClient } from "./internal/getTestClient.js";

/** Parameters required for reading a contract. */
export type ReadContractParams = {
  /** The contract address to read from. */
  contractAdress: `0x${string}`;
  /** The contract ABI. */
  contractAbi: Abi;
  /** The function name to call. */
  functionName: string;
  /** The arguments to pass to the function. */
  args?: unknown[] | undefined;
  /** The wallet address to use for the transaction. */
  walletAddress?: string | undefined;
};

/**
 * Calls a read-only function from the contract on the blockchain.
 *
 * This function calls a read-only function from the contract on the blockchain
 * using the provided contract address, ABI, function name, and arguments.
 * It returns the data returned by the contract function.
 * It uses the test client to interact with the blockchain.
 *
 * @param params {@link ReadContractParams}
 *
 * @returns The data returned by the contract function. {@link ReadContractReturnType}
 *
 * @example
 * import { readContract } from "chukti";
 *
 * // Read a contract on the blockchain
 * const data = await readContract({
 *   contractAdress: "0x1234567890abcdef1234567890abcdef12345678",
 *   contractAbi: [
 *     {
 *       inputs: [],
 *       name: "get",
 *       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
 *       stateMutability: "view",
 *       type: "function",
 *     },
 *   ],
 *   functionName: "get",
 * });
 * console.log(data);
 */
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
