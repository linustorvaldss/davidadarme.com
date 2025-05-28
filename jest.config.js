import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const nextJest = require('next/jest').default;

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transformIgnorePatterns: [
    '/node_modules/(?!next-view-transitions|next|@next|react|react-dom|@vercel)'
  ],
  moduleNameMapper: {
    '^~~/(.*)$': '<rootDir>/src/$1'
  }
};

export default createJestConfig(customJestConfig);