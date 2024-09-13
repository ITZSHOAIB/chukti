import {
  createTestClient,
  http,
  publicActions,
  walletActions,
  Abi,
} from "viem";
import { anvil } from "viem/chains";
import fs from "fs-extra";
import path from "path";
import { world } from "@cucumber/cucumber";
import assert from "assert";

export const verifyContractPath = function (contractPath: string) {
  if (!contractPath.toLowerCase().includes(".sol")) {
    contractPath = `${contractPath}.sol`;
  }

  if (!fs.existsSync(path.resolve(process.cwd(), contractPath))) {
    throw new Error(`❌ Contract file not found at: ${contractPath}`);
  }

  world.contractPath = contractPath;
  world.log(`Contract exists at: ${contractPath}`);
};

export const deployContract = async function (args: string, amount: string) {
  if (!world?.contractPath) {
    throw new Error("❌ Contract path not set. Please set the contract path");
  }

  const contractPath = world.contractPath;
  const contractName = path.basename(contractPath, ".sol");
  const compiledContractPath = `artifacts/${contractPath}/${contractName}.json`;

  if (!fs.existsSync(path.resolve(process.cwd(), compiledContractPath))) {
    throw new Error(`❌ Contract ${contractName} not compiled correctly`);
  }

  const contract = fs.readJSONSync(compiledContractPath);

  const testClient = createTestClient({
    chain: anvil,
    mode: "anvil",
    transport: http(),
  })
    .extend(publicActions)
    .extend(walletActions);

  const testAddresses = await testClient.getAddresses();
  const deployerAddress = testAddresses[0];

  const transactionHash = await testClient.deployContract({
    abi: contract.abi as Abi,
    account: deployerAddress,
    bytecode: contract.bytecode,
    args: JSON.parse(args),
    value: BigInt(amount),
  });

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
