module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.tsx', "**/*.test.ts"],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  "transform": {
    "\\.ts$": ["babel-jest", { "configFile": "./babel.config.test.js" }],
    "\\.tsx$": ["babel-jest", { "configFile": "./babel.config.test.js" }]
  }
};
