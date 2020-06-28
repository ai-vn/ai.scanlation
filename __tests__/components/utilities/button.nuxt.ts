import { shallowMount } from '@vue/test-utils';
import { Vue } from 'nuxt-property-decorator';
import button from '~/components/utilities/button.vue';
import icon from '~/components/utilities/icon.vue';

describe('components/utilities/button', () => {
    beforeAll(() => {
        Vue.component('icon-', icon);
    });

    it('should mounted', () => {
        expect.hasAssertions();
        const wrapper = shallowMount(button, {
            propsData: { icon: 'x', text: 'close' },
        });
        expect(wrapper.vm.$options.name).toStrictEqual('button-');
    });
});
