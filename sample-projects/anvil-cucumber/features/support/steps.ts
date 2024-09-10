import { AfterAll, BeforeAll, Given } from "@cucumber/cucumber";
import { beforeAll, afterAll, deployContract } from "chukti";

BeforeAll(beforeAll);
AfterAll(afterAll);

Given(
  "a deployed {string} contract with {string} arguments and {string} Ether",
  deployContract
);
