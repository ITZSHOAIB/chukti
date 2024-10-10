import path from "node:path";
import fs from "fs-extra";
import { type Abi, type DeployContractParameters, getAddress } from "viem";
import { ERROR_MESSAGES } from "../internal/utils/errorMessages.js";
import { getProjectType } from "../internal/utils/projectConfig.js";
import { getTestClient } from "./internal/getTestClient.js";

/** Represents the result of a contract deployment. */
export type DeploymentResult = {
  /** The status of the deployment. It can be either "success" or "reverted". */
  deploymentStatus: "success" | "reverted";
  /** The address of the deployed contract. */
  deployedAddress: `0x${string}` | null | undefined;
  /** The ABI of the deployed contract. */
  contractAbi: Abi;
};

/** Parameters required for deploying a contract. */
export type DeployParams = {
  /** The path to the contract file. */
  contractPath: string;
  /** The constructor arguments for the contract. */
  args?: unknown[] | undefined;
  /** The amount of Ether to send with the deployment. */
  amount?: bigint | undefined;
  /** The wallet address to use for deployment. */
  walletAddress?: string | undefined;
};

/**
 * Deploys a smart contract based on the provided parameters.
 *
 * This function handles the deployment of a smart contract by compiling it
 * and deploying it to the blockchain. It supports different project types
 * such as Hardhat and Forge.
 *
 * @param params {@link DeployParams}
 *
 * @returns The result of the deployment, including
 * the deployment status, deployed address, and contract ABI.
 * {@link DeploymentResult}
 *
 * @example
 * import { deployContract } from "chukti";
 *
 * const result = await deployContract({
 *   contractPath: "contracts/MyContract.sol",
 *   args: ["arg1", 123],
 *   amount: BigInt(1),
 *   walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
 * });
 * console.log(result);
 */
export const deployContract = async ({
  contractPath,
  args,
  amount,
  walletAddress,
}: DeployParams): Promise<DeploymentResult> => {
  const projectType = getProjectType(process.cwd());

  if (!projectType) {
    throw new Error(ERROR_MESSAGES.CHUKTI_PROJECT_NOT_FOUND);
  }

  const contractName = path.basename(contractPath, ".sol");
  let compiledContractPath = "";

  if (projectType === "hardhat-viem") {
    compiledContractPath = path.resolve(
      process.cwd(),
      `artifacts/${contractPath}/${contractName}.json`,
    );
  } else if (projectType === "forge-anvil") {
    compiledContractPath = path.resolve(
      process.cwd(),
      `out/${contractName}.sol/${contractName}.json`,
    );
  }

  if (!fs.existsSync(compiledContractPath)) {
    throw new Error(`❌ Contract ${contractName} not compiled correctly`);
  }

  const contract = fs.readJSONSync(compiledContractPath);

  const testClient = getTestClient();
  const testAddresses = await testClient.getAddresses();
  const deployerAddress = walletAddress
    ? getAddress(walletAddress)
    : testAddresses[0];

  const transactionHash = await testClient.deployContract({
    abi: contract.abi as Abi,
    account: deployerAddress,
    bytecode:
      projectType === "hardhat-viem"
        ? contract.bytecode
        : contract.bytecode.object,
    args,
    value: amount,
  } as DeployContractParameters);

  const transactionReceipt = await testClient.waitForTransactionReceipt({
    hash: transactionHash,
  });

  return {
    deploymentStatus: transactionReceipt.status,
    deployedAddress: transactionReceipt.contractAddress,
    contractAbi: contract.abi,
  };
};
