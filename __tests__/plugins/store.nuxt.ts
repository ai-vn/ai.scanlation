import pluginStore from '~/plugins/store';

describe('plugins/store', () => {
    beforeAll(() => {
        jest.mock('~/actions/actions.import', () => ({
            actions: {},
        }));

        window.onNuxtReady = (callback: () => void) => callback();
    });

    it('should pass', async () => {
        expect.hasAssertions();

        const { installPlugin } = await import('~/__tests__/__utils__/nuxt');

        expect(() => {
            installPlugin(pluginStore);
        }).not.toThrow();
    });
});
