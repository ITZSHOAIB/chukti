import {
  Client,
  createTestClient,
  http,
  publicActions,
  TestClientConfig,
  walletActions,
} from "viem";
import { ProjectType } from "../internal/types.js";
import { anvil, hardhat } from "viem/chains";

export const getTestClient = (projectType: ProjectType): Client => {
  const testClientConfigOverride: Partial<TestClientConfig> = {};
  if (projectType === ProjectType.ForgeAnvil) {
    testClientConfigOverride.chain = anvil;
    testClientConfigOverride.mode = "anvil";
  }

  const testClient = createTestClient({
    chain: hardhat,
    mode: "hardhat",
    transport: http(),
    ...testClientConfigOverride,
  })
    .extend(publicActions)
    .extend(walletActions);

  return testClient;
};
