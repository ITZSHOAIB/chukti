import assert from "node:assert";
import { world } from "@cucumber/cucumber";
import { ERROR_MESSAGES } from "../../../internal/utils/errorMessages.js";
import { type ParseValueType, parseValue } from "../../utils/parseValue.js";

/** Compares the actual value of a variable with the expected value. */
export type ComparisonType =
  | "equal to"
  | "not equal to"
  | "greater than"
  | "greater than or equal to"
  | "less than"
  | "less than or equal to"
  | "contains"
  | "does not contain";

const compareValues = (
  actualValue: unknown,
  expectedValue: unknown,
  comparisonType: ComparisonType,
): void => {
  switch (comparisonType) {
    case "equal to":
      assert.strictEqual(
        actualValue,
        expectedValue,
        ERROR_MESSAGES.COMPARISON_ASSERTION_MESSAGE(
          actualValue,
          comparisonType,
          expectedValue,
        ),
      );
      break;
    case "not equal to":
      assert.notStrictEqual(
        actualValue,
        expectedValue,
        ERROR_MESSAGES.COMPARISON_ASSERTION_MESSAGE(
          actualValue,
          comparisonType,
          expectedValue,
        ),
      );
      break;
    case "greater than":
      if (
        (typeof actualValue === "number" &&
          typeof expectedValue === "number") ||
        (typeof actualValue === "bigint" && typeof expectedValue === "bigint")
      ) {
        assert.ok(
          actualValue > expectedValue,
          ERROR_MESSAGES.COMPARISON_ASSERTION_MESSAGE(
            actualValue,
            comparisonType,
            expectedValue,
          ),
        );
      } else {
        throw new Error(
          `Cannot compare non-numeric values using "${comparisonType}"`,
        );
      }
      break;
    case "greater than or equal to":
      if (
        (typeof actualValue === "number" &&
          typeof expectedValue === "number") ||
        (typeof actualValue === "bigint" && typeof expectedValue === "bigint")
      ) {
        assert.ok(
          actualValue >= expectedValue,
          ERROR_MESSAGES.COMPARISON_ASSERTION_MESSAGE(
            actualValue,
            comparisonType,
            expectedValue,
          ),
        );
      } else {
        throw new Error(
          `Cannot compare non-numeric values using "${comparisonType}"`,
        );
      }
      break;
    case "less than":
      if (
        (typeof actualValue === "number" &&
          typeof expectedValue === "number") ||
        (typeof actualValue === "bigint" && typeof expectedValue === "bigint")
      ) {
        assert.ok(
          actualValue < expectedValue,
          ERROR_MESSAGES.COMPARISON_ASSERTION_MESSAGE(
            actualValue,
            comparisonType,
            expectedValue,
          ),
        );
      } else {
        throw new Error(
          `Cannot compare non-numeric values using "${comparisonType}"`,
        );
      }
      break;
    case "less than or equal to":
      if (
        (typeof actualValue === "number" &&
          typeof expectedValue === "number") ||
        (typeof actualValue === "bigint" && typeof expectedValue === "bigint")
      ) {
        assert.ok(
          actualValue <= expectedValue,
          ERROR_MESSAGES.COMPARISON_ASSERTION_MESSAGE(
            actualValue,
            comparisonType,
            expectedValue,
          ),
        );
      } else {
        throw new Error(
          `Cannot compare non-numeric values using "${comparisonType}"`,
        );
      }
      break;
    case "contains":
      if (
        typeof actualValue === "string" &&
        typeof expectedValue === "string"
      ) {
        assert.ok(
          actualValue.includes(expectedValue),
          `Expected ${actualValue} to contain ${expectedValue}`,
        );
      } else {
        throw new Error(`"contains" comparison requires string values`);
      }
      break;
    case "does not contain":
      if (
        typeof actualValue === "string" &&
        typeof expectedValue === "string"
      ) {
        assert.ok(
          !actualValue.includes(expectedValue),
          `Expected ${actualValue} to not contain ${expectedValue}`,
        );
      } else {
        throw new Error(`"does not contain" comparison requires string values`);
      }
      break;
    default:
      throw new Error(`Unsupported comparison type: ${comparisonType}`);
  }
};

/**
 * Compares the actual value of a variable with the expected value.
 *
 * @param variableName - The name of the variable to compare.
 * @param comparisonType - The type of comparison to perform.
 * @param expectedValue - The expected value to compare against.
 *
 * @example
 * import { resultComparisonStep } from "chukti";
 *
 * Then("I validate the value stored in {string} should be {string} {string}", resultComparisonStep);
 */
export const resultComparisonStep = (
  variableName: string,
  comparisonType: ComparisonType,
  expectedValue: string,
) => {
  const actualValue = world?.userVariables?.[variableName];
  if (actualValue === undefined) {
    throw new Error(`No data found for variable ${variableName}`);
  }

  const parsedExpectedValue = parseValue(
    expectedValue,
    typeof actualValue as ParseValueType,
  );
  compareValues(actualValue, parsedExpectedValue, comparisonType);

  world.log(
    `Variable ${variableName} with value ${actualValue} is ${comparisonType} ${parsedExpectedValue} as expected`,
  );
};
