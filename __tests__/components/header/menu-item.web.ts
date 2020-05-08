/* eslint-disable no-underscore-dangle */
import { remote } from 'electron';
import { mount } from '@vue/test-utils';
import menuItem from '~/components/header/menu-item.vue';
import { actions } from '~/modules/actions.import';

describe('components/header/menu-item', () => {
    beforeAll(() => {
        require('babel-plugin-require-context-hook/register')();
        require('~/plugins/components-auto');
        jest.spyOn(remote.getCurrentWindow(), 'maximize').mockImplementation();
    });

    it.each([
        [{}, true],
        [{ default: '<div />' }, true],
        [{ default: '<div />' }, false],
    ])('should mounted', (slots, isRoot) => {
        expect.hasAssertions();
        const wrapper = mount<
            menuItem & {
                enter: Function;
                leave: Function;
                isRoot: boolean;
            }
        >(menuItem, {
            propsData: { action: actions.maximize },
            slots,
        });
        wrapper.vm.isRoot = isRoot;
        expect(wrapper.vm.$options.name).toStrictEqual('menu-item-');
        expect(wrapper.vm.enter).not.toThrow();
        expect(wrapper.vm.leave).not.toThrow();
        expect((wrapper.vm as any).action_).not.toThrow();
    });
});
