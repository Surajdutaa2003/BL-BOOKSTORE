import '@testing-library/jest-dom';

// Global objects ko set karne ka safe tareeka
if (typeof globalThis !== "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  globalThis.TextEncoder = TextEncoder;
  globalThis.TextDecoder = TextDecoder as any;
}
