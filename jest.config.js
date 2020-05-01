// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const common = {
    clearMocks: true,

    errorOnDeprecated: true,
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],

    moduleNameMapper: {
        '~/(.*)$': '<rootDir>/$1',
    },
    reporters: ['default', 'jest-junit'],
    setupFilesAfterEnv: ['jest-extended'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    preset: 'ts-jest/presets/js-with-babel',
    globals: { 'ts-jest': { babelConfig: true } },
};

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        '**/*.{ts,tsx,vue}',
        '!**/*.d.ts',
        '!**/gulpfile.babel.ts',
        '!**/node_modules/**',
        '!**/__tests__/**',
        '!**/__mocks__/**',
        '!**/vendor/**',
    ],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [],
    coverageReporters: ['cobertura', 'text-summary', 'html'],
    watchPlugins: ['jest-watch-select-projects'],
    projects: [
        {
            ...common,
            displayName: 'Nuxt',
            testEnvironment: 'jsdom',
            testMatch: ['**/__tests__/nuxt/**/*.test.ts'],
        },
        {
            ...common,
            displayName: 'Electron Renderer',
            runner: '@jest-runner/electron',
            testEnvironment: '@jest-runner/electron/environment',
            testMatch: ['**/__tests__/renderer/**/*.test.ts'],
        },
        {
            ...common,
            displayName: 'Electron Main',
            runner: '@jest-runner/electron/main',
            testEnvironment: 'node',
            testMatch: ['**/__tests__/main/**/*.test.ts'],
        },
    ],
    ...common,
};
