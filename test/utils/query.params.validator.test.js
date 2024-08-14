import { describe, test, expect } from "@jest/globals";
import { validatePage, validatePageSize, validateSorting } from "../../src/utils/query.params.validator.js";
import GenericMongoDBRepository from "../../src/repositories/generic.mongodb.repository.js";

const validInputTestSpecs = [
  {
    description: "Basic integer input",
    input: "5",
    expected: 5,
  },
  {
    description: "Floating point input",
    input: "31.416",
    expected: 31,
  },
  {
    description: "Integer with spaces around",
    input: " 10 ",
    expected: 10,
  },
  {
    description: "Floating point with spaces around",
    input: " 27.1828 ",
    expected: 27,
  },
  {
    description: "Integer with spaces between",
    input: "  9 1  ",
    expected: 9,
  },
  {
    description: "Floating point with spaces between",
    input: "  21.846 1  ",
    expected: 21,
  },
];

const invalidInputTestSpecs = [
  {
    description: "Out of range input",
    input: "0",
  },
  {
    description: "Invalid floating point input",
    input: ".502937",
  },
  {
    description: "Empty input",
    input: "",
  },
  {
    description: "Non-digits input",
    input: "one",
  },
  {
    description: "HEX notation input",
    input: "0x0A",
  },
  {
    description: "boolean true input",
    input: "true",
  },
  {
    description: "boolean false input",
    input: "false",
  },
  {
    description: "Undefined input",
    input: undefined,
  },
  {
    description: "null input",
    input: null,
  },
];

const validSortingTestSpecs = [
  {
    description: "Basic valid input for ascending order",
    input: "asc",
    expected: { price: 1 },
  },
  {
    description: "Basic valid input for descending order",
    input: "desc",
    expected: { price: -1 },
  },
  {
    description: "All-caps for ascending order",
    input: "ASC",
    expected: { price: 1 },
  },
  {
    description: "All-caps for descending order",
    input: "DESC",
    expected: { price: -1 },
  },
  {
    description: "Mixed case for ascending order",
    input: "aSc",
    expected: { price: 1 },
  },
  {
    description: "Mixed case for descending order",
    input: "dEsC",
    expected: { price: -1 },
  },
  {
    description: "Mixed case and spaces around for ascending order",
    input: "   aSc   ",
    expected: { price: 1 },
  },
  {
    description: "Mixed case and spaces around for descending order",
    input: "   dEsC   ",
    expected: { price: -1 },
  },
];

const invalidSortingTestSpecs = [
  {
    description: "Basic invalid word",
    input: "foo",
  },
  {
    description: "Empty string",
    input: "",
  },
  {
    description: "Vaid word with spaces between",
    input: "d e   s c",
  },
  {
    description: "Numeric type input",
    input: 1,
  },
  {
    description: "Boolean type input",
    input: true,
  },
  {
    description: "Undefined input",
    input: undefined,
  },
  {
    description: "Null type input",
    input: null,
  },
];

describe("Tests page validator", () => {
  test.each(validInputTestSpecs)(
    "$description: given '$input', should return $expected",
    ({ input, expected }) => {
      expect(validatePage(input)).toBe(expected);
  });

  test.each(invalidInputTestSpecs)(
    "$description: given '$input', should return the default value",
    ({ input }) => {
      expect(validatePage(input)).toBe(
        GenericMongoDBRepository.DEFAULT_PAGE_VALUE
      );
    }
  );
});

describe("Tests pageSize validator", () => {
  test.each(validInputTestSpecs)(
    "$description: given '$input', should return $expected",
    ({ input, expected}) => {
      expect(validatePageSize(input)).toBe(expected);
    }
  );

  test.each(invalidInputTestSpecs)(
    "$description: given '$input', should return the default value",
    ({ input }) => {
      expect(validatePageSize(input)).toBe(
        GenericMongoDBRepository.DEFAULT_PAGE_SIZE_VALUE
      );
    }
  );
});

describe("Tests sorting validator", () => {
  test.each(validSortingTestSpecs)(
    "$description: given '$input', should return $expected",
    ({ input, expected }) => {
      expect(validateSorting(input)).toStrictEqual(expected);
    }
  );

  test.each(invalidSortingTestSpecs)(
    "$description: given '$input', should return an empty object",
    ({ input }) => {
      expect(validateSorting(input)).toStrictEqual({});
    }
  );
});
