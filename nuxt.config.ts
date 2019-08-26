import NuxtConfiguration from '@nuxt/config';
import { isDev as dev } from './app/env';

const nuxtConfiguration: NuxtConfiguration = {
    dev,
    mode: 'spa',
    head: { title: 'Ai Scanlation' },
    generate: {
        dir: 'dist/renderer',
    },
    router: {
        mode: 'hash',
        base: !dev ? './' : undefined,
    },
    plugins: ['./plugins/listen'],
    build: {
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

export default nuxtConfiguration;
