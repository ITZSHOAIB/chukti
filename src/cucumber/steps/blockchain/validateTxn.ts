import { world } from "@cucumber/cucumber";
import { TxnStatus } from "../../../internal/types.js";
import { getTxnReceipt } from "../../../viem/getTxnReceipt.js";

export const validateTxnStep = async (status: string) => {
  if (!world?.chukti?.lastTxnHash) {
    throw new Error(
      "No transaction hash found to validate. Please perform a transaction first.",
    );
  }

  const expectedStatus = status.toLowerCase();
  const lastTxnHash = world.chukti.lastTxnHash;

  if (
    expectedStatus !== TxnStatus.SUCCESS &&
    expectedStatus !== TxnStatus.REVERTED
  ) {
    throw new Error(
      `Invalid status value: ${status}, expected ${TxnStatus.SUCCESS} or ${TxnStatus.REVERTED}`,
    );
  }

  const txnReceipt = await getTxnReceipt({ txnHash: lastTxnHash });

  if (txnReceipt.status === TxnStatus.SUCCESS) {
    world.log(`Transaction ${lastTxnHash} was successful as expected`);
  } else if (txnReceipt.status === TxnStatus.REVERTED) {
    world.log(`Transaction ${lastTxnHash} was reverted as expected`);
  } else {
    throw new Error(
      `Transaction ${lastTxnHash} status did not match the expected status: ${expectedStatus}`,
    );
  }
};
