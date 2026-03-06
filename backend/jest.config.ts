module.exports = 
{
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/?(*.)+(spec|test).[tj]s"],
    setupFiles: ["<rootDir>/jest.setup.ts"]
};