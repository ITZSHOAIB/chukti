import {
  AfterAll,
  BeforeAll,
  Given,
  setDefaultTimeout,
  Then,
} from "@cucumber/cucumber";
import {
  beforeAll,
  afterAll,
  deployContract,
  verifyContractPath,
} from "chukti";

setDefaultTimeout(150 * 1_000);

BeforeAll(beforeAll);
AfterAll(afterAll);

Given("a contract at path {string}", verifyContractPath);
Then(
  "deploy the contract with {string} arguments and {string} Ether",
  deployContract
);
