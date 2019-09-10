import { Configuration } from '@nuxt/types';
import { isDev as dev } from './app/env';
import { getCertificate } from './modules/getCertificate';

export default async function(): Promise<Configuration> {
    const { key, cert } = await getCertificate();

    return {
        dev,
        mode: 'spa',
        head: { title: 'Ai Scanlation' },
        router: { mode: 'hash', base: !dev ? './' : undefined },
        server: { https: { key, cert } },
        generate: { dir: 'dist/renderer' },
        plugins: [
            //
            '~/plugins/component',
            '~/plugins/listen',
        ],
        css: ['~/assets/style/main.pcss'],
        buildModules: [
            [
                '@nuxt/typescript-build',
                { typeCheck: true, ignoreNotFoundWarnings: true },
            ],
            '@nuxtjs/tailwindcss',
        ],
        purgeCSS: {},
        tailwindcss: {
            configPath: '~/tailwind.config.js',
            cssPath: '~/assets/style/tailwind.pcss',
        },
        build: {
            extractCSS: !dev,
            postcss: {
                plugins: {
                    'postcss-hexrgba': {},
                    'postcss-import': {},
                    'postcss-nested': {},
                    'postcss-simple-vars': {},
                },
                preset: { autoprefixer: {} },
            },
            extend(webpackConfig, { isClient, isDev }) {
                if (isClient) {
                    if (isDev) {
                        webpackConfig.devtool = 'cheap-module-eval-source-map';
                    }
                    webpackConfig.target = 'electron-renderer';

                    if (webpackConfig.module) {
                        webpackConfig.module.rules.push({
                            test: /\.p(ost)?css$/i,
                            use: [
                                {
                                    loader: 'sass-resources-loader',
                                    options: {
                                        resources:
                                            './assets/style/variables.pcss',
                                    },
                                },
                            ],
                        });
                    }
                }
            },
        },
    };
}
