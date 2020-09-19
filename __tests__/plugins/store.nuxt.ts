describe('plugins/store', () => {
    beforeAll(() => {
        window.onNuxtReady = (callback: () => void) => callback();
    });

    it('should pass', async () => {
        expect.assertions(0);

        const { installPlugin } = await import('~/__tests__/__utils__/nuxt');
        const pluginStore = await import('~/plugins/store');

        installPlugin(pluginStore.default);
    });
});
