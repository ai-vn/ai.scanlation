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
    cacheDirectory: './.cache/jest',
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
        '!**/.nuxt/**',
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
            displayName: 'Core',
            testEnvironment: 'node',
            testMatch: ['**/__tests__/**/*.node.ts'],
        },
        {
            ...common,
            displayName: 'Nuxt',
            testEnvironment: 'jsdom',
            testMatch: ['**/__tests__/**/*.nuxt.ts'],
        },
        {
            ...common,
            displayName: 'Electron Renderer',
            runner: '@jest-runner/electron',
            testEnvironment: '@jest-runner/electron/environment',
            testMatch: ['**/__tests__/**/*.web.ts'],
        },
        {
            ...common,
            displayName: 'Electron Main',
            runner: '@jest-runner/electron/main',
            testEnvironment: 'node',
            testMatch: ['**/__tests__/**/*.main.ts'],
        },
    ],
    ...common,
};
