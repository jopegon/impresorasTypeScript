// jest.config.cjs
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],

  setupFiles: ['<rootDir>/tests/config/jest.setup.ts'],

  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts']
};


// Evita que Jest cargue módulos pesados o que inicien el servidor
jest.mock('../../src/index', () => ({}));
jest.mock('../../src/server/server', () => ({
  Server: class {
    listen() { }
    close() { }
  }
}));
jest.mock('../../src/services/ConsultaImpresora', () => ({}));