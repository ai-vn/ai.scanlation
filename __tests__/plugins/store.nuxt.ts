describe('plugins/store', () => {
    beforeAll(() => {
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
