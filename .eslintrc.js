/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const isWin = require('os').platform() === 'win32';
const path = require('path');

const packageDir = [
    path.join(__dirname),
    path.join(__dirname, 'node_modules/@nuxt/typescript-build'),
    path.join(__dirname, 'node_modules/@nuxt/typescript-runtime'),
    path.join(__dirname, 'node_modules/@nuxt/vue-app'),
    path.join(__dirname, 'node_modules/@nuxt/vue-renderer'),
    path.join(__dirname, 'node_modules/@nuxt/webpack'),
    path.join(__dirname, 'node_modules/@nuxtjs/tailwindcss'),
    path.join(__dirname, 'node_modules/nuxt'),
];

const config = {
    env: {
        node: true,
        browser: true,
        es6: true,
        'jest/globals': true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 2017,
        ecmaFeatures: {
            jsx: false,
        },
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'standard',

        'plugin:node/recommended',
        'plugin:import/warnings',
        'plugin:import/errors',
        'plugin:import/typescript',

        'plugin:jest/all',

        'plugin:vue/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:nuxt/recommended',

        'prettier/@typescript-eslint',
        'prettier/vue',
    ],
    plugins: [
        'standard',
        'import',
        'node',
        'jest',
        'vue',
        '@typescript-eslint',
    ],
    settings: {
        cache: true,
        'import/resolver': {
            typescript: {},
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/core-modules': ['electron'],
    },
    rules: {
        'class-methods-use-this': 'off',
        'eol-last': 'error',
        'linebreak-style': ['error', isWin ? 'windows' : 'unix'],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-lonely-if': 'error',
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-expressions': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'prefer-const': 'error',

        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-expressions': ['error'],
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '_$' },
        ],
        '@typescript-eslint/prefer-interface': 'off',

        'node/no-extraneous-import': 'off',
        'node/no-extraneous-require': 'off',
        'node/no-missing-import': 'off',
        'node/no-unpublished-import': 'off',
        'node/no-unsupported-features/es-syntax': 'off',

        'import/newline-after-import': 'error',
        'import/prefer-default-export': 'off',
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                alphabetize: { order: 'asc', caseInsensitive: true },
                'newlines-between': 'never',
            },
        ],
        'import/extensions': ['error', 'never', { json: 'always' }],
        'import/no-cycle': ['error', { maxDepth: 2 }],
        'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: false,
                optionalDependencies: false,
                peerDependencies: false,
                packageDir,
            },
        ],
        'vue/html-self-closing': [
            'error',
            { html: { void: 'always', normal: 'always', component: 'always' } },
        ],
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    },
    overrides: [
        {
            files: ['store/*.ts'],
            rules: {
                'import/no-cycle': 'off',
            },
        },
        {
            files: ['**/__tests__/**/*.ts', '**/__mocks__/**/*.ts'],
            rules: {
                'import/namespace': 'off',
                'jest/no-if': 'off',
                'max-classes-per-file': 'off',
                'node/no-unpublished-require': 'off',
            },
        },
        {
            files: [
                '**/__tests__/**/*.ts',
                '**/__mocks__/**/*.ts',
                'types/*.d.ts',
                'app/**/*.ts',
                'nuxt.config.ts',
                'gulpfile.babel.ts',
            ],
            rules: {
                'import/no-extraneous-dependencies': [
                    'error',
                    { devDependencies: true, packageDir },
                ],
                'jest/no-hooks': [
                    'error',
                    {
                        allow: [
                            'beforeAll',
                            'beforeEach',
                            'afterAll',
                            'afterEach',
                        ],
                    },
                ],
            },
        },
        {
            files: ['nuxt.config.ts'],
            rules: {
                'no-param-reassign': [
                    'error',
                    {
                        props: true,
                        ignorePropertyModificationsFor: ['webpackConfig'],
                    },
                ],
            },
        },
        {
            files: ['gulpfile.babel.ts'],
            rules: { 'no-console': 'off' },
        },
        {
            files: ['plugins/**.ts'],
            rules: {
                'import/no-extraneous-dependencies': ['error', { packageDir }],
            },
        },
    ],
};

if (process.env.NODE_ENV === 'development') {
    config.plugins.push('only-warn');
}

module.exports = config;
