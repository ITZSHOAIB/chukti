export enum ParseValueType {
  Number = "number",
  BigInt = "bigint",
  Boolean = "boolean",
  Object = "object",
  String = "string",
}

const getConversionErrorMessage = (type: ParseValueType, value: string) =>
  `Cannot convert "${value}" to actual value's type: ${type}`;

export const parseValue = (
  value: string,
  targetType: ParseValueType,
): unknown => {
  switch (targetType) {
    case ParseValueType.Number:
      if (!Number.isNaN(+value)) {
        return +value;
      }
      throw new Error(getConversionErrorMessage(ParseValueType.Number, value));
    case ParseValueType.BigInt:
      try {
        return BigInt(value);
      } catch {
        throw new Error(
          getConversionErrorMessage(ParseValueType.Object, value),
        );
      }
    case ParseValueType.Boolean:
      if (value === "true" || value === "false") {
        return value === "true";
      }
      throw new Error(getConversionErrorMessage(ParseValueType.Boolean, value));
    case ParseValueType.Object:
      try {
        return JSON.parse(value);
      } catch {
        throw new Error(
          getConversionErrorMessage(ParseValueType.Object, value),
        );
      }
    case ParseValueType.String:
      return value;
    default:
      throw new Error(`Unsupported type of actual value: ${targetType}`);
  }
};
