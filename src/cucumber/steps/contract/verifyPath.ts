import path from "node:path";
import { world } from "@cucumber/cucumber";
import fs from "fs-extra";

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
