// eslint-disable-next-line no-undef
module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageProvider: "v8",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/interfaces/**",
    "!src/utils/errors.ts",
    "!src/routes/**",
    "!src/index.ts",
    "!src/database/index.ts",
    "!src/server.ts",
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
  coverageDirectory: "babel",
  setupFilesAfterEnv: ["<rootDir>/tests/setups/prisma.setup.ts"],
};
