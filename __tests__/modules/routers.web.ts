import { createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import { NuxtApp } from '@nuxt/types/app';
import { actions } from '~/modules/actions.import';

describe('module: routers', () => {
    beforeAll(() => {
        const vue = createLocalVue();
        vue.use(VueRouter);
        const router = new VueRouter();
        const nuxtApp = {
            $options: {},
            $router: router,
        } as NuxtApp;
        window.$nuxt = nuxtApp;
    });

    it('should go to routes', () => {
        expect.hasAssertions();
        expect(actions.goToHome.call).not.toThrow();
        expect(actions.goToExplorer.call).not.toThrow();
        expect(actions.goToReader.call).not.toThrow();
        expect(actions.goToSetting.call).not.toThrow();
    });
});
