import {
  createTestClient,
  http,
  publicActions,
  walletActions,
  Abi,
} from "viem";
import { anvil } from "viem/chains";
import fs from "fs-extra";
import { world } from "@cucumber/cucumber";

export const registerContractName = (contractName: string) => {
  if (contractName.toLowerCase().includes(".sol")) {
    contractName = contractName.split(".sol")[0];
  }
  world.contractName = contractName;

  world.log(`Contract name registered: ${contractName}.sol`);
};

export const deployContract = async function (args: string, amount: string) {
  if (!world?.contractName) {
    throw new Error("❌ Contract name is not registered");
  }

  const contractName = world.contractName;
  const compiledContractPath = `out/${contractName}.sol/${contractName}.json`;

  if (!fs.existsSync(compiledContractPath)) {
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
    bytecode: contract.bytecode.object,
    args: JSON.parse(args),
    value: BigInt(amount),
  });

  world.log(
    `Contract deployment initiated. Transaction hash: ${transactionHash}`
  );

  const transactionReceipt = await testClient.waitForTransactionReceipt({
    hash: transactionHash,
  });

  if (transactionReceipt.status === "success") {
    world.log(
      `Contract deployed successfully at: ${transactionReceipt.contractAddress}`
    );
    world.contractAddress = transactionReceipt.contractAddress;
  } else {
    throw new Error(`❌ Contract deployment failed for ${contractName}.sol`);
  }
};
