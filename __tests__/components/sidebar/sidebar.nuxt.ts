import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';

describe('components/sidebar/sidebar', () => {
    beforeAll(async () => {
        Vue.component('sidebar-item-', {
            props: {
                action: { type: Object, required: true },
                path: { type: String, required: true },
            },
        });
    });

    it('should mounted', async () => {
        expect.hasAssertions();

        const sidebar = await import('~/components/sidebar/sidebar.vue');

        const wrapper = shallowMount(sidebar.default);
        expect(wrapper.vm.$options.name).toStrictEqual('sidebar-');
    });
});
