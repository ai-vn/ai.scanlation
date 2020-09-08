import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';

describe('components/header/menu', () => {
    beforeAll(async () => {
        const icon = await import('~/components/utilities/icon.vue');
        const menuItem = await import('~/components/header/menu-item.vue');

        Vue.component('icon-', icon);
        Vue.component('menu-item-', menuItem);
    });

    it('should mounted', async () => {
        expect.hasAssertions();

        const menu = await import('~/components/header/menu.vue');

        const wrapper = shallowMount(menu.default);
        expect(wrapper.vm.$options.name).toStrictEqual('menu-');
    });
});
