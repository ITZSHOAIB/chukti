import type { ComparisonType } from "../../cucumber/steps/generic/dataComparison.js";
import type { ParseValueType } from "../../cucumber/utils/parseValue.js";

export const ERROR_MESSAGES = {
  CHUKTI_PROJECT_NOT_FOUND:
    "No Chukti project found in the current directory. Please run 'chukti init' to create a new Chukti project.",
  CONTRACT_PATH_NOT_SET: "Contract path not set. Please set the contract path",
  CHUKTI_PROJECT_ALREADY_EXISTS:
    "A Chukti project already exists in this directory.",
  NO_CONTRACT_DEPLOYMENT_FOUND:
    "No contract deployment found. Please deploy a contract first.",
  INVALID_WALLET_ADDRESS: (address: string) =>
    `Provided address ${address} is not a valid test wallet address.`,
  INVALID_WALLET_ADDRESS_INDEX: (index: number, maxIndex: number) =>
    `Provided wallet index ${index} is invalid. Please provide an index between 0 and ${maxIndex}`,
  TYPE_CONVERSION_ERROR: (type: ParseValueType, value: string) =>
    `Cannot convert "${value}" to actual value's type: ${type}`,
  COMPARISON_ASSERTION_MESSAGE: (
    actualValue: unknown,
    operator: ComparisonType,
    expectedValue: unknown,
  ) => `Expected ${actualValue} to be ${operator} ${expectedValue}`,
};
