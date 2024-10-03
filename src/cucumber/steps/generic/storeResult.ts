import { world } from "@cucumber/cucumber";

/**
 * Stores the last result in a variable.
 *
 * @param variableName - The name of the variable to store the result in.
 *
 * @example
 * import { storeResultStep } from "chukti";
 *
 * Then("I store the result in {string}", storeResultStep);
 */
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
