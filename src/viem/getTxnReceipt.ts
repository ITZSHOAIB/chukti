import type { TransactionReceipt } from "viem";
import { getTestClient } from "./internal/getTestClient.js";

export const getTxnReceipt = async ({
  txnHash,
}: { txnHash: `0x${string}` }): Promise<TransactionReceipt> => {
  const testClient = getTestClient();

  return await testClient.waitForTransactionReceipt({
    hash: txnHash,
  });
};
