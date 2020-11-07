import { shallowMount } from '@vue/test-utils';
import group from '~/components/utilities/group.vue';

describe('components/utilities/group', () => {
    it('should mounted', () => {
        expect.hasAssertions();

        const wrapper = shallowMount(group);
        expect(wrapper.vm.$el.className).toStrictEqual('group');
    });
});
