import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import icon from '~/components/utilities/icon.vue';

describe('components/utilities/icon', () => {
    it('should mounted', () => {
        expect.hasAssertions();
        const wrapper = shallowMount(icon, {
            propsData: { i: 'x' },
        });
        expect(wrapper.vm.$options.name).toStrictEqual('icon-');
    });

    it('should mounted with empty icon', () => {
        expect.hasAssertions();
        const wrapper = shallowMount(icon);
        expect(wrapper.vm.$options.name).toStrictEqual('icon-');
    });

    it('should mounted with error', () => {
        expect.hasAssertions();
        jest.spyOn(console, 'error').mockImplementation();
        const wrapper = shallowMount<Vue & { icon: string }>(icon, {
            propsData: { i: 'not-found-this-icon' },
        });
        expect(wrapper.vm.icon).toStrictEqual('');
    });
});
