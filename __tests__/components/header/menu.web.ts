import { shallowMount } from '@vue/test-utils';
import menu from '~/components/header/menu.vue';

describe('components/header/menu', () => {
    beforeAll(() => {
        require('babel-plugin-require-context-hook/register')();
        require('~/plugins/components-auto');
    });

    it('should mounted', () => {
        expect.hasAssertions();
        const wrapper = shallowMount(menu);
        expect(wrapper.vm.$options.name).toStrictEqual('menu-');
    });
});
