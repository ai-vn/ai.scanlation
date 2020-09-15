import { NuxtConfig } from '@nuxt/types';
import { isDev as dev } from './app/env';
import postcssFunctionsOptions from './assets/helpers/functions/postcss.functions';
import postcssMixinsOptions from './assets/helpers/mixins/postcss.mixins';
import { getCertificate } from './utils/build/certificate';

export default async (): Promise<NuxtConfig> => {
    const { key, cert } = await getCertificate();

    return {
        dev,
        mode: 'spa',
        head: {
            title: 'Ai Scanlation',
            meta: [{ charset: 'utf-8' }],
        },
        ignore: ['**/__tests__/**'],
        router: { mode: 'hash', base: !dev ? '/app/' : undefined },
        server: { https: { key, cert } },
        generate: { dir: 'dist/renderer' },
        plugins: [
            '~/plugins/components-auto',
            '~/plugins/v-tooltip',
            '~/plugins/listen',
            '~/plugins/store',
        ],
        css: ['~/assets/style/index.pcss'],
        buildModules: [
            [
                '@nuxt/typescript-build',
                { typeCheck: true, ignoreNotFoundWarnings: true },
            ],
            '@nuxtjs/composition-api',
            '@nuxtjs/tailwindcss',
            '@nuxtjs/moment',
        ],
        moment: {
            defaultLocale: 'en',
            locales: ['vi'],
        },
        purgeCSS: {},
        tailwindcss: {
            configPath: '~/assets/style/tailwind.config.ts',
            cssPath: '~/assets/style/tailwind.pcss',
        },
        build: {
            extractCSS: !dev,
            postcss: {
                plugins: {
                    'postcss-hexrgba': {},

                    'postcss-each': {},
                    'postcss-functions': postcssFunctionsOptions,
                    'postcss-mixins': postcssMixinsOptions,
                    'postcss-simple-vars': {},

                    'postcss-nested-ancestors': {},
                    'postcss-nested': {},
                },
                preset: {
                    autoprefixer: {},
                    features: {
                        'custom-properties': false,
                    },
                },
            },
            extend(webpackConfig, { isClient, isDev }) {
                if (isClient) {
                    if (isDev) {
                        webpackConfig.devtool = 'cheap-module-eval-source-map';
                    }
                    webpackConfig.target = 'electron-renderer';
                }
            },
        },
    };
};
