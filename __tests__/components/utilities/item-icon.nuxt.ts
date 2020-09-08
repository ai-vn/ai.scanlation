import { shallowMount } from '@vue/test-utils';
import itemIcon from '~/components/utilities/item-icon.vue';

describe('components/utilities/item-icon', () => {
    it('should mounted', () => {
        expect.hasAssertions();

        const wrapper = shallowMount(itemIcon, {
            propsData: { ext: 'folder' },
        });
        expect(wrapper.vm.$options.name).toStrictEqual('item-icon-');
    });
});
