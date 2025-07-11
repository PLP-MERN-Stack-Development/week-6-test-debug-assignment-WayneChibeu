// jest.config.js - Root Jest configuration file

module.exports = {
  projects: [
    {
      displayName: 'client',
      testEnvironment: 'jsdom', // For DOM-related tests
      testMatch: ['<rootDir>/client/src/tests/**/*.test.js', '<rootDir>/client/src/tests/**/*.test.jsx'],
      setupFilesAfterEnv: ['<rootDir>/client/jest.setup.js'], // For React Testing Library extensions
      moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Handle CSS imports in tests
      },
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest for JSX
      },
      // collectCoverageFrom: ['<rootDir>/client/src/**/*.{js,jsx}'], // Collect coverage from client source
      // coverageDirectory: '<rootDir>/coverage/client',
    },
    {
      displayName: 'server',
      testEnvironment: 'node', // For Node.js tests
      testMatch: ['<rootDir>/server/tests/**/*.test.js'],
      setupFilesAfterEnv: ['<rootDir>/server/jest.setup.js'], // For MongoDB Memory Server setup
      // collectCoverageFrom: ['<rootDir>/server/src/**/*.{js}'], // Collect coverage from server source
      // coverageDirectory: '<rootDir>/coverage/server',
    },
  ],
  // For overall coverage
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'], 
};