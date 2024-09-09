import { AfterAll, BeforeAll, Given } from "@cucumber/cucumber";
import { createTestClient, http, publicActions, walletActions } from "viem";
import { anvil as anvilChain } from "viem/chains";
import { beforeAll, afterAll } from "chukti";

BeforeAll(beforeAll);
AfterAll(afterAll);

Given(
  "a deployed {string} contract with {string} arguments and {string} Ether",
  async function (contractName: string, args: string, amount: string) {
    const testClient = createTestClient({
      chain: anvilChain,
      mode: "anvil",
      transport: http(),
    })
      .extend(publicActions)
      .extend(walletActions);
    console.log("Lock address:", await testClient.getAddresses());
  }
);
