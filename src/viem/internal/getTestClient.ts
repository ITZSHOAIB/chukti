import {
  http,
  type Client,
  type PublicActions,
  type TestActions,
  type TestClientConfig,
  type WalletActions,
  createTestClient,
  publicActions,
  walletActions,
} from "viem";
import { anvil, hardhat } from "viem/chains";
import type { ProjectType } from "../../internal/types.js";
import { ERROR_MESSAGES } from "../../internal/utils/errorMessages.js";
import { getProjectType } from "../../internal/utils/projectConfig.js";

/**
 * The test client for the current project type.
 */
export type TestWalletClient = Client &
  TestActions &
  PublicActions &
  WalletActions;

const testClientCache: Map<ProjectType, TestWalletClient> = new Map();

/**
 * Retrieves the test client for the current project type.
 *
 * This function returns a cached test client if available, or creates a new one
 * based on the project type (e.g., Hardhat, Anvil).
 *
 * @returns The test client configured for the current project type. {@link TestWalletClient}
 *
 * @example
 * import { getTestClient } from "chukti";
 *
 * const testClient = getTestClient();
 * const data = await testClient.readContract({
 *   address: contractAdress,
 *   abi: contractAbi,
 *   functionName,
 *   args,
 *   account: senderAddress,
 * });
 * return data;
 */
export const getTestClient = (): TestWalletClient => {
  const projectType = getProjectType(process.cwd());

  if (!projectType) {
    throw new Error(ERROR_MESSAGES.CHUKTI_PROJECT_NOT_FOUND);
  }

  if (testClientCache.has(projectType)) {
    const cachedClient = testClientCache.get(projectType);
    if (cachedClient) {
      return cachedClient;
    }
  }

  const testClientConfigOverride: Partial<TestClientConfig> = {};
  if (projectType === "forge-anvil") {
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

  testClientCache.set(projectType, testClient);
  return testClient;
};
