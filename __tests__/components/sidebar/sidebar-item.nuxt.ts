import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import icon from '~/components/utilities/icon/icon.vue';
import '~/plugins/v-tooltip';

describe('components/sidebar/sidebar-item', () => {
    beforeAll(() => {
        Vue.component('icon-', icon);
        Vue.component('n-link', {
            props: {
                to: { type: [String, Location], required: true },
                exact: { type: Boolean, default: false },
            },
        });
    });

    it('should mounted', async () => {
        expect.hasAssertions();

        const { default: sidebarItem } = await import(
            '~/components/sidebar/sidebar-item.vue'
        );

        const wrapper = shallowMount(sidebarItem, {
            propsData: { action: { call: jest.fn() }, path: '/' },
        });
        expect(wrapper.vm.$options.name).toStrictEqual('sidebar-item-');
    });
});
