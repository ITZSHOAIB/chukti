import { world } from "@cucumber/cucumber";
import { getTxnReceipt } from "../../../viem/getTxnReceipt.js";

export enum TxnStatus {
  Success = "success",
  Reverted = "reverted",
}

export const validateTxnStep = async (status: string) => {
  if (!world?.chukti?.lastTxnHash) {
    throw new Error(
      "No transaction hash found to validate. Please perform a transaction first.",
    );
  }

  const expectedStatus = status.toLowerCase();
  const lastTxnHash = world.chukti.lastTxnHash;

  if (
    expectedStatus !== TxnStatus.Success &&
    expectedStatus !== TxnStatus.Reverted
  ) {
    throw new Error(
      `Invalid status value: ${status}, expected ${TxnStatus.Success} or ${TxnStatus.Reverted}`,
    );
  }

  const txnReceipt = await getTxnReceipt({ txnHash: lastTxnHash });

  if (txnReceipt.status === TxnStatus.Success) {
    world.log(`Transaction ${lastTxnHash} was successful as expected`);
  } else if (txnReceipt.status === TxnStatus.Reverted) {
    world.log(`Transaction ${lastTxnHash} was reverted as expected`);
  } else {
    throw new Error(
      `Transaction ${lastTxnHash} status did not match the expected status: ${expectedStatus}`,
    );
  }
};
