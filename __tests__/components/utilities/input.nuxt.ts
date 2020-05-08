import { shallowMount } from '@vue/test-utils';
import input from '~/components/utilities/input.vue';

describe('components/utilities/input', () => {
    it('should mounted', () => {
        expect.hasAssertions();
        const wrapper = shallowMount(input, {
            propsData: { type: 'number' },
        });
        expect(wrapper.vm.$options.name).toStrictEqual('input-');
    });
});
