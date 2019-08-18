const path = require('path');
var isWin = require('os').platform() === 'win32';

const config = {
    env: {
        node: true,
        browser: true,
        es6: true,
        mocha: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'standard',

        'plugin:node/recommended',
        'plugin:import/warnings',
        'plugin:import/errors',
        'plugin:import/typescript',

        'plugin:vue/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',

        'prettier/@typescript-eslint',
        'prettier/vue',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 2017,
        ecmaFeatures: {
            jsx: false,
        },
    },
    plugins: ['standard', 'vue', 'import', 'node', '@typescript-eslint'],
    settings: {
        cache: true,
        'import/resolver': {
            typescript: {},
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
    rules: {
        'eol-last': 'error',
        'linebreak-style': ['error', isWin ? 'windows' : 'unix'],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-lonely-if': 'error',
        'prefer-const': 'error',
        'no-useless-constructor': 'off',

        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/prefer-interface': 'off',

        'node/no-unsupported-features/es-syntax': 'off',
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
                'newlines-between': 'never',
            },
        ],
        'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: false,
                optionalDependencies: false,
                peerDependencies: false,
                packageDir: [
                    path.join('./'),
                    path.join(__dirname, 'node_modules/@nuxt/builder'),
                    path.join(__dirname, 'node_modules/@nuxt/vue-app'),
                    path.join(__dirname, 'node_modules/nuxt'),
                ],
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
            files: [
                'test/**/*.ts',
                'types/*.d.ts',
                'app/**/*.ts',
                'nuxt.config.ts',
            ],
            rules: {
                'import/no-extraneous-dependencies': [
                    'error',
                    { devDependencies: true },
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
    ],
};

if (process.env.NODE_ENV == 'development') {
    config.plugins.push('only-warn');
}

module.exports = config;
