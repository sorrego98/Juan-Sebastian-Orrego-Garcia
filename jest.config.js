module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '(/test/integration/.*|(\\.|/)(spec))\\.ts$',
  };
  