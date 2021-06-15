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
  testRegex: "/test/.*.test.ts?$",
  verbose: false,
};
