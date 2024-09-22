import assert from "node:assert";
import { world } from "@cucumber/cucumber";
import { type ParseValueType, parseValue } from "../../utils/parseValue.js";

export enum ComparisonType {
  EqualTo = "equal to",
  NotEqualTo = "not equal to",
  GreaterThan = "greater than",
  GreaterThanOrEqualTo = "greater than or equal to",
  LessThan = "less than",
  LessThanOrEqualTo = "less than or equal to",
  Contains = "contains",
  DoesNotContain = "does not contain",
}

const compareValues = (
  actualValue: unknown,
  expectedValue: unknown,
  comparisonType: ComparisonType,
): void => {
  switch (comparisonType) {
    case ComparisonType.EqualTo:
      assert.strictEqual(
        actualValue,
        expectedValue,
        `Expected ${actualValue} to be equal to ${expectedValue}`,
      );
      break;
    case ComparisonType.NotEqualTo:
      assert.notStrictEqual(
        actualValue,
        expectedValue,
        `Expected ${actualValue} to be not equal to ${expectedValue}`,
      );
      break;
    case ComparisonType.GreaterThan:
      if (
        (typeof actualValue === "number" &&
          typeof expectedValue === "number") ||
        (typeof actualValue === "bigint" && typeof expectedValue === "bigint")
      ) {
        assert.ok(
          actualValue > expectedValue,
          `Expected ${actualValue} to be greater than ${expectedValue}`,
        );
      } else {
        throw new Error(
          `Cannot compare non-numeric values using "${ComparisonType.GreaterThan}"`,
        );
      }
      break;
    case ComparisonType.GreaterThanOrEqualTo:
      if (
        (typeof actualValue === "number" &&
          typeof expectedValue === "number") ||
        (typeof actualValue === "bigint" && typeof expectedValue === "bigint")
      ) {
        assert.ok(
          actualValue >= expectedValue,
          `Expected ${actualValue} to be greater than or equal to ${expectedValue}`,
        );
      } else {
        throw new Error(
          `Cannot compare non-numeric values using "${ComparisonType.GreaterThanOrEqualTo}"`,
        );
      }
      break;
    case ComparisonType.LessThan:
      if (
        (typeof actualValue === "number" &&
          typeof expectedValue === "number") ||
        (typeof actualValue === "bigint" && typeof expectedValue === "bigint")
      ) {
        assert.ok(
          actualValue < expectedValue,
          `Expected ${actualValue} to be less than ${expectedValue}`,
        );
      } else {
        throw new Error(
          `Cannot compare non-numeric values using "${ComparisonType.LessThan}"`,
        );
      }
      break;
    case ComparisonType.LessThanOrEqualTo:
      if (
        (typeof actualValue === "number" &&
          typeof expectedValue === "number") ||
        (typeof actualValue === "bigint" && typeof expectedValue === "bigint")
      ) {
        assert.ok(
          actualValue <= expectedValue,
          `Expected ${actualValue} to be less than or equal to ${expectedValue}`,
        );
      } else {
        throw new Error(
          `Cannot compare non-numeric values using "${ComparisonType.LessThanOrEqualTo}"`,
        );
      }
      break;
    case ComparisonType.Contains:
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
    case ComparisonType.DoesNotContain:
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

export const resultComparisonStep = (
  variableName: string,
  comparisonType: ComparisonType,
  expectedValue: string,
) => {
  const actualValue = world[variableName];
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
