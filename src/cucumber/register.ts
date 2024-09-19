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
  deployContractStep,
  verifyContractPathStep,
} from "./steps/contract/deploy.js";
import { readContractStep } from "./steps/contract/read.js";
import { writeContractStep } from "./steps/contract/write.js";
import { resultComparisonStep } from "./steps/generic/dataComparison.js";

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
  Given("a contract at path {string}", verifyContractPathStep);
  Then(
    "deploy the contract with {string} arguments and {string} Ether",
    deployContractStep,
  );
  When(
    "reading the contract function {string} with arguments {string} and store the result in {string}",
    readContractStep,
  );
  When(
    "writing to the contract function {string} with arguments {string} and {string} Ether and store the transaction hash in {string}",
    writeContractStep,
  );

  // generic steps
  Then(
    "the value stored in {string} should be {string} {string}",
    resultComparisonStep,
  );
};
