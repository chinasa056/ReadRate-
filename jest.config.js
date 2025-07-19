module.exports = {
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.ts'],
    "coverageReporters": ["json", "html"],
    preset: 'ts-jest',
    testEnvironment: 'node',
  };
