import { createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import { NuxtApp } from '@nuxt/types/app';
import { requireActual } from '~/__tests__/__utils__/mock';

describe('actions/routers/**', () => {
    beforeAll(() => {
        jest.mock('~/actions/actions.import', () => ({
            actions: requireActual('~/actions/pages/routers'),
        }));

        const vue = createLocalVue();
        vue.use(VueRouter);
        const router = new VueRouter();
        const nuxtApp = {
            $options: {},
            $router: router,
        } as NuxtApp;
        window.$nuxt = nuxtApp;
    });

    it('should go to routes', async () => {
        expect.hasAssertions();

        const { actions } = await import('~/actions/actions.import');

        expect(actions.goToHome.call).not.toThrow();
        expect(actions.goToExplorer.call).not.toThrow();
        expect(actions.goToReader.call).not.toThrow();
        expect(actions.goToSetting.call).not.toThrow();
    });
});
