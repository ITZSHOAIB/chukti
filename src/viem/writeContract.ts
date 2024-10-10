import { type Abi, getAddress } from "viem";
import { getTestClient } from "./internal/getTestClient.js";

/** Parameters required for writing to a contract. */
export type WriteContractParams = {
  /** The contract address to write to. */
  contractAdress: `0x${string}`;
  /** The contract ABI. */
  contractAbi: Abi;
  /** The function name to call. */
  functionName: string;
  /** The arguments to pass to the function. */
  args?: unknown[] | undefined;
  /** The amount to send with the transaction. */
  amount?: bigint | undefined;
  /** The wallet address to use for the transaction. */
  walletAddress?: string | undefined;
};

/** The result of writing to a contract. */
export type WriteContractResult = {
  /** The result of the contract function. */
  result: unknown;
  /** The transaction hash of the contract write. */
  txnHash: `0x${string}`;
};

/**
 * Calls a write function from the contract on the blockchain.
 *
 * This function sends transaction on the blockchain using the provided contract
 * address, ABI, function name, arguments, amount, and wallet address.
 * It returns the result of the contract function and the transaction hash.
 * It uses the test client to interact with the blockchain.
 *
 * @param params {@link WriteContractParams}
 *
 * @returns The result of the contract function and the transaction hash. {@link WriteContractResult}
 *
 * @example
 * import { writeContract } from "chukti";
 *
 * // Write to a contract on the blockchain
 * const { result, txnHash } = await writeContract({
 *   contractAdress: "0x1234567890abcdef1234567890abcdef12345678",
 *   contractAbi: [
 *     {
 *       inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
 *       name: "set",
 *       outputs: [],
 *       stateMutability: "nonpayable",
 *       type: "function",
 *     },
 *   ],
 *   functionName: "set",
 *   args: [42n],
 *   amount: 0n,
 * });
 * console.log(result, txnHash);
 */
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
