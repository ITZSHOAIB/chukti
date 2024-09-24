import { world } from "@cucumber/cucumber";

export const storeResultStep = async (variableName: string) => {
  if (!world.chukti?.lastResult) {
    throw new Error(
      "No result found to store. Please perform an operation first.",
    );
  }

  if (!world?.userVariables) {
    world.userVariables = {};
  }

  world.userVariables[variableName] = world.chukti.lastResult;

  world.log(
    `Stored the last result: ${world.chukti.lastResult} in ${variableName} variable`,
  );
};