/* eslint-disable @typescript-eslint/no-empty-function */
import { shallowMount } from '@vue/test-utils';
import { Vue } from 'nuxt-property-decorator';
import '~/plugins/v-tooltip';
import icon from '~/components/utilities/icon.vue';

describe('components/sidebar/sidebar', () => {
    beforeAll(async () => {
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
            propsData: { action: { call: () => {} }, path: '/' },
        });
        expect(wrapper.vm.$el.className).toStrictEqual('sidebar-item');
    });
});
