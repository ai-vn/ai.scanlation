/* eslint-disable no-underscore-dangle */
import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import { mock } from '~/__tests__/__utils__/mock';
import icon from '~/components/utilities/icon.vue';

describe('components/header/menu-item', () => {
    beforeAll(() => {
        Vue.component('icon-', icon);

        jest.mock('~/actions/actions.import', () => ({ actions: {} }));
        mock('~/utils', ['decorators/action', 'decorators/render']);
    });

    it.each([
        [{}, true],
        [{ default: '<div />' }, true],
        [{ default: '<div />' }, false],
    ])('should mounted', async (slots, isRoot) => {
        expect.hasAssertions();

        const { default: menuItem } = await import(
            '~/components/header/menu-item.vue'
        );

        const wrapper = shallowMount<
            Vue & {
                enter(): void;
                leave(): void;
                isRoot: boolean;
            }
        >(menuItem, {
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
