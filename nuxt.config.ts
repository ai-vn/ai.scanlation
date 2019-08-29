import NuxtConfiguration from '@nuxt/config';
import { isDev as dev } from './app/env';
import { getCertificate } from './modules/getCertificate';

export default async function(): Promise<NuxtConfiguration> {
    const { key, cert } = await getCertificate();

    return {
        dev,
        mode: 'spa',
        head: { title: 'Ai Scanlation' },
        router: {
            mode: 'hash',
            base: !dev ? './' : undefined,
        },
        plugins: ['./plugins/listen'],
        server: { https: { key, cert } },
        generate: { dir: 'dist/renderer' },
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
}
