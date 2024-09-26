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

export interface RegisterChuktiStepsParams {
  customHooks?: {
    beforeAll?: () => Promise<void> | void;
    afterAll?: () => Promise<void> | void;
  };
  defaultTimeout?: number;
}

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
  Then(
    "I validate the status of the last transaction is {string}",
    validateTxnStep,
  );

  // generic steps
  Then("I store the result in {string}", storeResultStep);
  Then(
    "I validate the value stored in {string} should be {string} {string}",
    resultComparisonStep,
  );
};
