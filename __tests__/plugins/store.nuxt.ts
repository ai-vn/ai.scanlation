import { mock } from '~/__tests__/__utils__/mock';

describe('plugins/store', () => {
    beforeAll(() => {
        mock('~/utils', [
            'decorators/store.watch',
            'system/async',
            'system/execute',
        ]);
        mock('~/modules/explorer', [
            'analyze/explorer',
            'analyze/images/images',
        ]);
        jest.mock('~/actions/actions.import', () => ({
            actions: {},
        }));

        window.onNuxtReady = (callback: () => void) => callback();
    });

    it('should pass', async () => {
        expect.hasAssertions();

        const { installPlugin } = await import('~/__tests__/__utils__/nuxt');
        const pluginStore = await import('~/plugins/store');

        expect(() => {
            installPlugin(pluginStore.default);
        }).not.toThrow();
    });
});
