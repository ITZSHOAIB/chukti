import { AfterAll, BeforeAll, Given, Then } from "@cucumber/cucumber";
import {
  beforeAll,
  afterAll,
  deployContract,
  registerContractName,
} from "chukti";

BeforeAll(beforeAll);
AfterAll(afterAll);

Given("a contract with name {string}", registerContractName);
Then(
  "deploy the contract with {string} arguments and {string} Ether",
  deployContract
);
