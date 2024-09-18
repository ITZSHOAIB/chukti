import {
  AfterAll,
  BeforeAll,
  Given,
  Then,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import {
  beforeAll as defaultBeforeAll,
  afterAll as defaultAfterAll,
} from "./hooks.js";
import {
  deployContractStep,
  verifyContractPathStep,
} from "./steps/contract/deploy.js";

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
};
