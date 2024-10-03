import { world } from "@cucumber/cucumber";
import { TxnStatus, type TxnStatusType } from "../../../internal/types.js";
import { getTxnReceipt } from "../../../viem/getTxnReceipt.js";

/**
 * Validates the status of the last transaction performed.
 *
 * @param status - The expected status of the last transaction.
 *
 * @example
 * import { validateTxnStep } from "chukti";
 *
 * Then("I validate the status of the last transaction is {string}", validateTxnStep);
 */
export const validateTxnStep = async (status: string) => {
  if (!world?.chukti?.lastTxnHash) {
    throw new Error(
      "No transaction hash found to validate. Please perform a transaction first.",
    );
  }

  const expectedStatus = status.toLowerCase() as TxnStatusType;
  const lastTxnHash = world.chukti.lastTxnHash;

  if (!Object.values(TxnStatus).includes(expectedStatus)) {
    throw new Error(
      `Invalid status value: ${status}, expected ${TxnStatus.success} or ${TxnStatus.reverted}`,
    );
  }

  const txnReceipt = await getTxnReceipt({ txnHash: lastTxnHash });

  if (txnReceipt.status === TxnStatus.success) {
    world.log(`Transaction ${lastTxnHash} was successful as expected`);
  } else if (txnReceipt.status === TxnStatus.reverted) {
    world.log(`Transaction ${lastTxnHash} was reverted as expected`);
  } else {
    throw new Error(
      `Transaction ${lastTxnHash} status did not match the expected status: ${expectedStatus}`,
    );
  }
};
