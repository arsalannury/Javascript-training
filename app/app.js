function Converter(value, valueType, objectKey = "key") {
  if (typeof valueType !== "string") {
    throw new Error(
      `type string is not assignable to type ${typeof valueType}`
    );
  }

  const valueTypeToLowerCase = valueType.toLowerCase().trim();

  if (valueTypeToLowerCase === "string") {
    if (typeof value === "number") {
      return String(value);
    } else if (Array.isArray(value)) {
      return value.join(" ");
    } else if (typeof value === "boolean") {
      return String(value);
    } else {
      throw new Error(`can not change type ${typeof value} to string`);
    }
  }

  if (valueTypeToLowerCase === "boolean") {
    return Boolean(value);
  }

  if (valueTypeToLowerCase === "any[]") {
    if (typeof value === "string") {
      return value.split("");
    } else if (typeof value === "number" || typeof value === "boolean") {
      return [value];
    } else {
      throw new Error(`can not change type ${typeof value} to any[]`);
    }
  }

  if (valueTypeToLowerCase === "object{}") {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "function" ||
      Array.isArray(value)
    ) {
      return { [objectKey]: value };
    } else {
      throw new Error(`can not change type ${typeof value} to object{}`);
    }
  }

  if (valueTypeToLowerCase === "number") {
    if (isNaN(value)) {
      throw new Error(
        `this always return NaN because ${value} can not change to number`
      );
    } else {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return [];
        } else {
          return [Number(value)];
        }
      } else {
        return Number(value);
      }
    }
  }

  if (valueTypeToLowerCase === "function") {
    return function ConverterFunction() {
      return value;
    };
  }

  if (
    valueTypeToLowerCase === "bigint" ||
    valueTypeToLowerCase === "undefined" ||
    valueTypeToLowerCase === "symbol"
  ) {
    throw new Error("Converter dosen't support another javascrtipt type");
  } else {
    throw new Error(
      `type ${valueTypeToLowerCase} does not exist on standard javascript types`
    );
  }
}
module.exports = Converter;