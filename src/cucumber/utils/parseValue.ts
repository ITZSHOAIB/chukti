import { ERROR_MESSAGES } from "../../internal/utils/errorMessages.js";

export type ParseValueType =
  | "number"
  | "bigint"
  | "boolean"
  | "object"
  | "string";

export const parseValue = (
  value: string,
  targetType: ParseValueType,
): unknown => {
  switch (targetType) {
    case "number":
      if (!Number.isNaN(+value)) {
        return +value;
      }
      throw new Error(ERROR_MESSAGES.TYPE_CONVERSION_ERROR(targetType, value));
    case "bigint":
      try {
        return BigInt(value);
      } catch {
        throw new Error(
          ERROR_MESSAGES.TYPE_CONVERSION_ERROR(targetType, value),
        );
      }
    case "boolean":
      if (value === "true" || value === "false") {
        return value === "true";
      }
      throw new Error(ERROR_MESSAGES.TYPE_CONVERSION_ERROR(targetType, value));
    case "object":
      try {
        return JSON.parse(value);
      } catch {
        throw new Error(
          ERROR_MESSAGES.TYPE_CONVERSION_ERROR(targetType, value),
        );
      }
    case "string":
      return value;
    default:
      throw new Error(`Unsupported type of actual value: ${targetType}`);
  }
};
