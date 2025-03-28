import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Ensure this is correctly set
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};

export default config;
