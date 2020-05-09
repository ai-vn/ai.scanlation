import { shallowMount } from '@vue/test-utils';
import menu from '~/components/header/menu.vue';
import { importComponents } from '~/__tests__/__utils__/component';

describe('components/header/menu', () => {
    beforeAll(async () => {
        await importComponents();
    });

    it('should mounted', () => {
        expect.hasAssertions();
        const wrapper = shallowMount(menu);
        expect(wrapper.vm.$options.name).toStrictEqual('menu-');
    });
});
