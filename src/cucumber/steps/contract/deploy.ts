import assert from "node:assert";
import path from "node:path";
import { world } from "@cucumber/cucumber";
import fs from "fs-extra";
import { ERROR_MESSAGES } from "../../../internal/utils/errorMessages.js";
import { getProjectType } from "../../../internal/utils/projectConfig.js";
import { deployContract } from "../../../viem/deployContract.js";

export const verifyContractPathStep = (contractPath: string) => {
  if (!contractPath.toLowerCase().includes(".sol")) {
    if (!fs.existsSync(path.resolve(process.cwd(), `${contractPath}.sol`))) {
      throw new Error(`❌ Contract file not found at: ${contractPath}`);
    }
  }

  world.contractPath = contractPath;
  world.log(`Contract exists at: ${contractPath}`);
};

export const deployContractStep = async (args: string, amount: string) => {
  const projectType = getProjectType(process.cwd());
  if (projectType === null) {
    throw new Error(ERROR_MESSAGES.CHUKTI_PROJECT_NOT_FOUND);
  }

  if (!world?.contractPath) {
    throw new Error(ERROR_MESSAGES.CONTRACT_PATH_NOT_SET);
  }

  const contractPath = world.contractPath;

  // TODO: Implement cucumber datatable for args or other strategy to properly get array of arguments
  const { deploymentStatus, deployedAddress } = await deployContract({
    contractPath,
    args: args?.trim() ? JSON.parse(args) : undefined,
    amount: amount?.trim() ? BigInt(amount) : undefined,
  });

  assert.strictEqual(deploymentStatus, "success");

  world.log(`Contract deployed successfully at: ${deployedAddress}`);
  world.deployedAddress = deployedAddress;
};
