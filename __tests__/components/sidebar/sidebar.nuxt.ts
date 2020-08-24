/* eslint-disable @typescript-eslint/no-empty-function */
import { shallowMount } from '@vue/test-utils';
import { Vue } from 'nuxt-property-decorator';

describe('components/sidebar/sidebar', () => {
    beforeAll(async () => {
        jest.mock('~/actions/actions.import', () => ({
            actions: {
                goToHome: { call: () => {} },
                goToExplorer: { call: () => {} },
                goToReader: { call: () => {} },
                goToSetting: { call: () => {} },
            },
        }));

        Vue.component('sidebar-item-', {
            props: {
                action: { type: Object, required: true },
                path: { type: String, required: true },
            },
        });
    });

    it('should mounted', async () => {
        expect.hasAssertions();

        const { default: sidebar } = await import(
            '~/components/sidebar/sidebar.vue'
        );

        const wrapper = shallowMount(sidebar);
        expect(wrapper.vm.$el.className).toStrictEqual('sidebar');
    });
});
