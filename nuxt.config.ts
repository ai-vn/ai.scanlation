import NuxtConfiguration from '@nuxt/config';

const dev = process.env.NODE_ENV !== 'production';

const nuxtConfiguration: NuxtConfiguration = {
    mode: dev ? 'spa' : 'universal',
    head: { title: 'Ai Scanlation' },
    generate: {
        dir: 'dist/renderer',
    },
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
