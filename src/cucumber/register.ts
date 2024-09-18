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

  Given("a contract at path {string}", verifyContractPathStep);
  Then(
    "deploy the contract with {string} arguments and {string} Ether",
    deployContractStep,
  );
  When(
    "reading the contract function {string} with arguments {string} and store the result in {string}",
    readContractStep,
  );
};
