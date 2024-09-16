import { Abi, DeployContractParameters } from "viem";
import fs from "fs-extra";
import path from "path";
import { world } from "@cucumber/cucumber";
import assert from "assert";
import { getProjectType } from "../../../internal/utils/projectConfig.js";
import { ProjectType } from "../../../internal/types.js";
import { ERROR_MESSAGES } from "../../../internal/utils/errorMessages.js";
import { getTestClient } from "../../../viem/getTestClient.js";

export const verifyContractPath = (contractPath: string) => {
  if (!contractPath.toLowerCase().includes(".sol")) {
    contractPath = `${contractPath}.sol`;
  }

  if (!fs.existsSync(path.resolve(process.cwd(), contractPath))) {
    throw new Error(`❌ Contract file not found at: ${contractPath}`);
  }

  world.contractPath = contractPath;
  world.log(`Contract exists at: ${contractPath}`);
};

export const deployContract = async (args: string, amount: string) => {
  const projectType = getProjectType(process.cwd());
  if (projectType === null) {
    throw new Error(ERROR_MESSAGES.CHUKTI_PROJECT_NOT_FOUND);
  }

  if (!world?.contractPath) {
    throw new Error(ERROR_MESSAGES.CONTRACT_PATH_NOT_SET);
  }

  const contractPath = world.contractPath;
  const contractName = path.basename(contractPath, ".sol");
  let compiledContractPath: string = "";

  if (projectType === ProjectType.HardhatViem) {
    compiledContractPath = path.resolve(
      process.cwd(),
      `artifacts/${contractPath}/${contractName}.json`
    );
  } else if (projectType === ProjectType.ForgeAnvil) {
    compiledContractPath = path.resolve(
      process.cwd(),
      `out/${contractName}.sol/${contractName}.json`
    );
  }

  if (!fs.existsSync(compiledContractPath)) {
    throw new Error(`❌ Contract ${contractName} not compiled correctly`);
  }

  const contract = fs.readJSONSync(compiledContractPath);

  const testClient = getTestClient();

  const testAddresses = await testClient.getAddresses();
  const deployerAddress = testAddresses[0];

  const transactionHash = await testClient.deployContract({
    abi: contract.abi as Abi,
    account: deployerAddress,
    bytecode:
      projectType === ProjectType.HardhatViem
        ? contract.bytecode
        : contract.bytecode.object,
    args: JSON.parse(args),
    value: BigInt(amount),
  } as DeployContractParameters);

  world.log(
    `Contract deployment initiated. Transaction hash: ${transactionHash}`
  );

  const transactionReceipt = await testClient.waitForTransactionReceipt({
    hash: transactionHash,
  });

  assert.strictEqual(transactionReceipt.status, "success");

  world.log(
    `Contract deployed successfully at: ${transactionReceipt.contractAddress}`
  );
  world.contractAddress = transactionReceipt.contractAddress;
};
