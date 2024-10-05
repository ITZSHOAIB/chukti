import {
  AfterAll,
  BeforeAll,
  Given,
  Then,
  When,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import {
  afterAll as defaultAfterAll,
  beforeAll as defaultBeforeAll,
} from "./hooks.js";
import {
  setActiveWalletByAddressStep,
  setActiveWalletByIndexStep,
} from "./steps/blockchain/setActiveWallet.js";
import { validateTxnStep } from "./steps/blockchain/validateTxn.js";
import {
  deployContractStep,
  validateDeploymentStep,
} from "./steps/contract/deploy.js";
import { readContractStep } from "./steps/contract/read.js";
import { verifyContractPathStep } from "./steps/contract/verifyPath.js";
import { writeContractStep } from "./steps/contract/write.js";
import { resultComparisonStep } from "./steps/generic/dataComparison.js";
import { storeResultStep } from "./steps/generic/storeResult.js";
import { fetchWalletByIndexStep } from "./steps/blockchain/setActiveWallet.js";

/**
 * Parameters required for registering Chukti steps with the Cucumber framework.
 */
export type RegisterChuktiStepsParams = {
  /**
   * Custom hooks to be registered with the Cucumber framework.
   */
  customHooks?: {
    /**
     * Custom beforeAll hook.
     */
    beforeAll?: () => Promise<void> | void;
    /**
     * Custom afterAll hook.
     */
    afterAll?: () => Promise<void> | void;
  };
  /**
   * The default timeout for the steps.
   */
  defaultTimeout?: number;
};

/**
 * Registers the Chukti steps with the Cucumber framework.
 *
 * This function registers all the Chukti steps with the Cucumber framework.
 * It also allows custom hooks to be registered.
 *
 * @param params {@link RegisterChuktiStepsParams}
 *
 * @example
 * import { registerChuktiSteps } from "chukti";
 *
 * // Register the Chukti steps with the Cucumber framework
 * registerChuktiSteps({});
 */
export const registerChuktiSteps = ({
  customHooks,
  defaultTimeout = 30 * 1_000,
}: RegisterChuktiStepsParams) => {
  setDefaultTimeout(defaultTimeout);

  const beforeAllHook = customHooks?.beforeAll || defaultBeforeAll;
  const afterAllHook = customHooks?.afterAll || defaultAfterAll;

  BeforeAll(beforeAllHook);
  AfterAll(afterAllHook);

  // contract steps
  Given("I have a smart contract located at {string}", verifyContractPathStep);
  When(
    "I deploy the smart contract with constructor arguments {string} and send {string} Ether",
    deployContractStep,
  );
  Then("I validate the deployment status is {string}", validateDeploymentStep);
  When(
    "I call the read function {string} from the contract with arguments {string}",
    readContractStep,
  );
  When(
    "I call the write function {string} from the contract with arguments {string} and send {string} Ether",
    writeContractStep,
  );

  // blockchain steps
  Then(
    "I validate the status of the last transaction is {string}",
    validateTxnStep,
  );

  When(
    "I fetch the wallet address at index {int}",
    fetchWalletByIndexStep
  );
  When(
    "I set the active test wallet address to the address {string}",
    setActiveWalletByAddressStep,
  );
  When(
    "I set the active test wallet address to the index {int}",
    setActiveWalletByIndexStep,
  );

  // generic steps
  Then("I store the result in {string}", storeResultStep);
  Then(
    "I validate the value stored in {string} should be {string} {string}",
    resultComparisonStep,
  );
};
