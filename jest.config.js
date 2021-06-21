module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverage: false,
  testRegex: "/__tests__/.*.test.ts?$",
  verbose: false,
};
