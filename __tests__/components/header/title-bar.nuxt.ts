/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';

describe('components/header/title-bar', () => {
    beforeAll(async () => {
        const icon = await import('~/components/utilities/icon/icon.vue');
        const menu = await import('~/components/header/menu.vue');
        const menuItem = await import('~/components/header/menu-item.vue');

        Vue.component('icon-', icon);
        Vue.component('menu-', menu);
        Vue.component('menu-item-', menuItem);
    });

    it('should mounted', async () => {
        expect.hasAssertions();

        const titleBar = await import('~/components/header/title-bar.vue');

        const wrapper = shallowMount(titleBar.default);

        expect(wrapper.vm.$options.name).toStrictEqual('title-bar-');
        wrapper.vm.$destroy();
    });
});
