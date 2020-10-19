import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import { store } from '~/__tests__/__utils__';
import icon from '~/components/utilities/icon/icon.vue';

describe('components/header/menu-item', () => {
    beforeAll(async () => {
        await store();

        Vue.component('icon-', icon);
    });

    it.each([
        [{}, true],
        [{ default: '<div />' }, true],
        [{ default: '<div />' }, false],
    ])('should mounted', async (slots, isRoot) => {
        expect.hasAssertions();

        const menuItem = await import('~/components/header/menu-item.vue');

        const wrapper = shallowMount<
            Vue & {
                enter(): void;
                leave(): void;
                isRoot: boolean;
            }
        >(menuItem.default, {
            propsData: { action: { call: jest.fn() } },
            slots,
        });
        wrapper.vm.isRoot = isRoot;
        expect(wrapper.vm.$options.name).toStrictEqual('menu-item-');
        expect(wrapper.vm.enter).not.toThrow();
        expect(wrapper.vm.leave).not.toThrow();
        expect((wrapper.vm as any).action_).not.toThrow();
    });
});
