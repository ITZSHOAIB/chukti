import {
  createTestClient,
  http,
  publicActions,
  walletActions,
  Abi,
} from "viem";
import { anvil } from "viem/chains";
import fs from "fs-extra";
import { log } from "../../internal/utils/logger.js";

export const deployContract = async function (
  contractName: string,
  args: string,
  amount: string
) {
  if (contractName.toLowerCase().includes(".sol")) {
    contractName = contractName.split(".sol")[0];
  }

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

  log(
    "sucess",
    `✅ Deployed contract ${contractName}.sol with hash ${transactionHash}`
  );
};
