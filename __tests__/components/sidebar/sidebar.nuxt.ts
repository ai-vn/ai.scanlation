import { shallowMount } from '@vue/test-utils';
import { Vue } from 'nuxt-property-decorator';
import sidebar from '~/components/sidebar/sidebar.vue';
import icon from '~/components/utilities/icon.vue';
import '~/plugins/v-tooltip';

describe('components/sidebar/sidebar', () => {
    beforeAll(() => {
        Vue.component('icon-', icon);
        Vue.component('n-link', {
            props: {
                to: { type: [String, Location], required: true },
                exact: { type: Boolean, default: false },
            },
        });
    });

    it('should mounted', () => {
        expect.hasAssertions();
        const wrapper = shallowMount(sidebar);
        expect(wrapper.vm.$el.className).toStrictEqual('sidebar');
    });
});
