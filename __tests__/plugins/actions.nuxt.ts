describe('plugins/actions', () => {
    it('should install plugin `actions`', async () => {
        expect.assertions(0);

        const { installPlugin } = await import('~/__tests__/__utils__/nuxt');
        const { default: actions } = await import('~/plugins/actions');

        await installPlugin(actions);
    });
});
