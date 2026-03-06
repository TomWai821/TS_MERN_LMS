module.exports = 
{
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[tj]s"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};