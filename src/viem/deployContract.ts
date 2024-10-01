import path from "node:path";
import fs from "fs-extra";
import { type Abi, type DeployContractParameters, getAddress } from "viem";
import { ProjectType } from "../internal/types.js";
import { ERROR_MESSAGES } from "../internal/utils/errorMessages.js";
import { getProjectType } from "../internal/utils/projectConfig.js";
import { getTestClient } from "./internal/getTestClient.js";

export interface DeploymentResult {
  deploymentStatus: "success" | "reverted";
  deployedAddress: `0x${string}` | null | undefined;
  contractAbi: Abi;
}

export interface DeployParams {
  contractPath: string;
  args?: unknown[] | undefined;
  amount?: bigint | undefined;
  walletAddress?: string | undefined;
}

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

  if (projectType === ProjectType.HardhatViem) {
    compiledContractPath = path.resolve(
      process.cwd(),
      `artifacts/${contractPath}/${contractName}.json`,
    );
  } else if (projectType === ProjectType.ForgeAnvil) {
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
      projectType === ProjectType.HardhatViem
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
