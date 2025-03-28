import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Ensure this is correctly set
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", 
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/src/Mock/fileMock.js"
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
   
};

export default config;
