import { describe, test, expect } from "@jest/globals";
import { buildQuery } from "../../src/utils/mongodb.query.builder.js";

const validTestSpecs = [
  {
    description: "valid JSON query object",
    input: '{ "title": "Spongebob Squarepants plushie", "status": true }',
    expected: {
      title: "Spongebob Squarepants plushie",
      status: true
    },
  },
  {
    description: "empty object",
    input: '{}',
    expected: {},
  },
  {
    description: "empty object with space between curly brackets",
    input: '{ }',
    expected: {},
  },
  {
    description: "valid JSON object with invalid query and many different attributes",
    input: '{ "height": 4.32, "units": "ft", "convert": true, "suffix": null, "types": ["tools", "home"], "attributes": { "material": "iron", "country": "USA" } }',
    expected: {
      height: 4.32,
      units: "ft",
      convert: true,
      suffix: null,
      types: ["tools", "home"],
      attributes: {
        material: "iron",
        country: "USA"
      }
    },
  },
];

const invalidTestSpecs = [
  { description: "incomplete JSON object representation 1", input: '{' },
  {
    description: "incomplete JSON object representation 2",
    input: '{ "category": "fish" '
  },
  { description: "invalid character", input: '[' },
  { description: "invalid JSON representation", input: '[ "status": false ]' },
  { description: "an empty array", input: "[]" },
  { description: "an array", input: '[ "title", "Digital camera" ]' },
  { description: "an invalid string 1", input: 'random text' },
  { description: "an invalid string 2", input: 'true' },
  { description: "an invalid string 3", input: '4' },
];

describe("Tests MongoDB query parsing", () => {
  test.each(validTestSpecs)(
    "$description: given '$input', should return $expected",
    ({ input, expected }) => {
      expect(buildQuery(input)).toStrictEqual(expected);
    }
  );

  test.each(invalidTestSpecs)(
    "$description: given '$input', should return an empty JSON sobject",
    ({ input }) => {
      expect(buildQuery(input)).toStrictEqual({});
    }
  );
});
