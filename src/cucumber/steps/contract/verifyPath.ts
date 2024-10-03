import path from "node:path";
import { world } from "@cucumber/cucumber";
import fs from "fs-extra";

/**
 * Verifies the contract path.
 *
 * This step verifies the contract path and sets it in the world object.
 *
 * @param contractPath - The path to the contract file.
 *
 * @example
 * import { verifyContractPathStep } from "chukti";
 *
 * Given("I have a smart contract located at {string}", verifyContractPathStep);
 */
export const verifyContractPathStep = (contractPath: string) => {
  if (!contractPath.toLowerCase().includes(".sol")) {
    if (!fs.existsSync(path.resolve(process.cwd(), `${contractPath}.sol`))) {
      throw new Error(`Contract file not found at: ${contractPath}`);
    }
  }

  if (!world.chukti) {
    world.chukti = {};
  }

  world.chukti.contractPath = contractPath;
  world.log(`Contract exists at: ${JSON.stringify(contractPath)}`);
};
