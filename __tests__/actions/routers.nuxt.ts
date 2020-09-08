import { NuxtApp } from '@nuxt/types/app';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { call } from '~/__tests__/__utils__';

Vue.use(VueRouter);

describe('actions/routers/**', () => {
    beforeAll(() => {
        window.$nuxt = {
            $options: {},
            $router: new VueRouter(),
        } as NuxtApp;
    });

    it('should go to routes', async () => {
        expect.assertions(0);

        await call(a => a.routers.goToHome);
        await call(a => a.routers.goToExplorer);
        await call(a => a.routers.goToReader);
        await call(a => a.routers.goToSetting);
    });
});
