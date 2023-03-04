/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testTimeout: 15000,
};
