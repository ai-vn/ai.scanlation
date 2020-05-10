import { Configuration } from '@nuxt/types';
import { Configuration as WebpackConfiguration } from 'webpack';
import { env } from '~/__tests__/__utils__/utils.env';

const { save, load } = env('NODE_ENV');

describe('nuxt.config', () => {
    const getConfig = async () => {
        const config = await (await import('~/nuxt.config')).default();
        return config;
    };

    describe('environment', () => {
        beforeEach(() => {
            jest.resetModules();
            save();
        });
        afterEach(load);

        it.each([['development'], ['production']])(
            'should be %p',
            async NODE_ENV => {
                expect.hasAssertions();
                process.env.NODE_ENV = NODE_ENV;
                const config = await getConfig();
                expect(config).toBeDefined();
            },
        );
    });

    describe('build.extend', () => {
        it.each([
            [true, true],
            [true, false],
            [false, true],
        ])(
            'should be valid [ isClient = %p, isDev = %p ]',
            async (isClient, isDev) => {
                expect.hasAssertions();
                const config: Configuration = await getConfig();

                expect(config.build?.extend).toBeDefined();
                if (!config.build?.extend) return;

                const webpackConfig: WebpackConfiguration = {};
                config.build.extend(webpackConfig, {
                    isClient,
                    isDev,
                    loaders: {},
                    isLegacy: true,
                    isModern: true,
                    isServer: true,
                });
                const { devtool, target } = webpackConfig;
                if (isClient) {
                    if (isDev) {
                        expect(devtool).toStrictEqual(
                            'cheap-module-eval-source-map',
                        );
                    }
                    expect(target).toStrictEqual('electron-renderer');
                }
            },
        );
    });
});
