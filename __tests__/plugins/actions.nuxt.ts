import Vue from 'vue';

describe('plugins/actions', () => {
    beforeAll(async () => {
        const { installPlugin } = await import('~/__tests__/__utils__/nuxt');
        const { default: actions } = await import('~/plugins/actions');

        await installPlugin(actions);
    });

    it('component should have method `$action`', () => {
        expect.assertions(0);

        new Vue().$action(x => x.settings.shortcuts.reset);
    });
});
