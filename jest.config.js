module.exports = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/tests/**/*.(test|spec).ts'],
};
