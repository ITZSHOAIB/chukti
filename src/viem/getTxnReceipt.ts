import type { TransactionReceipt } from "viem";
import { getTestClient } from "./internal/getTestClient.js";

/**
 * Retrieves the transaction receipt for a given transaction hash.
 *
 * This function waits for the transaction receipt to be available and then
 * returns it. It uses the test client to interact with the blockchain.
 *
 * @param params - The parameters required to get the transaction receipt.
 * @param {`0x${string}`} params.txnHash - The transaction hash to get the receipt for.
 *
 * @returns The transaction receipt. {@link TransactionReceipt}
 *
 * @example
 * import { getTxnReceipt } from "chukti";
 *
 * // Get the transaction receipt for a given transaction hash
 * const receipt = await getTxnReceipt({ txnHash: "0x1234567890abcdef1234567890abcdef12345678" });
 * console.log(receipt);
 */
export const getTxnReceipt = async ({
  txnHash,
}: { txnHash: `0x${string}` }): Promise<TransactionReceipt> => {
  const testClient = getTestClient();

  return await testClient.waitForTransactionReceipt({
    hash: txnHash,
  });
};
