import {
  Client,
  createTestClient,
  http,
  PublicActions,
  publicActions,
  TestActions,
  TestClientConfig,
  WalletActions,
  walletActions,
} from "viem";
import { ProjectType } from "../internal/types.js";
import { anvil, hardhat } from "viem/chains";
import { getProjectType } from "../internal/utils/projectConfig.js";
import { ERROR_MESSAGES } from "../internal/utils/errorMessages.js";

// TODO: Fine tune the return type
export const getTestClient = (): Client &
  TestActions &
  PublicActions &
  WalletActions => {
  const projectType = getProjectType(process.cwd());

  if (!projectType) {
    throw new Error(ERROR_MESSAGES.CHUKTI_PROJECT_NOT_FOUND);
  }

  const testClientConfigOverride: Partial<TestClientConfig> = {};
  if (projectType === ProjectType.ForgeAnvil) {
    testClientConfigOverride.chain = anvil;
    testClientConfigOverride.mode = "anvil";
  }

  const testClient = createTestClient({
    chain: hardhat,
    mode: "hardhat" as "anvil" | "hardhat" | "ganache",
    transport: http(),
    ...testClientConfigOverride,
  })
    .extend(publicActions)
    .extend(walletActions);

  return testClient;
};
