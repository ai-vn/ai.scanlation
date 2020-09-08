import { shallowMount } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import icon from '~/components/utilities/icon.vue';
import '~/plugins/v-tooltip';

describe('components/utilities/button', () => {
    let button: VueConstructor<Vue>;

    beforeAll(async () => {
        Vue.component('icon-', icon);
        button = (await import('~/components/utilities/button.vue')).default;
    });

    it('should mounted', async () => {
        expect.hasAssertions();

        const wrapper = shallowMount(button, { propsData: {} });
        wrapper.trigger('click');

        expect(wrapper.vm.$options.name).toStrictEqual('button-');
    });

    it('should mounted with tooltip', async () => {
        expect.assertions(0);

        shallowMount(button, { propsData: { tooltip: 'string' } });
        shallowMount(button, { propsData: { tooltip: true } });
        shallowMount(button, { propsData: { tooltip: false } });
    });
});
