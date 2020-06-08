import { BrowserWindow, remote } from 'electron';
import { mount } from '@vue/test-utils';
import titleBar from '~/components/header/title-bar.vue';
import { ActionItem } from '~/actions/actions.type';
import { importComponents } from '~/__tests__/__utils__/component';

describe('components/header/title-bar', () => {
    beforeAll(async () => {
        await importComponents();

        const currentWindow = remote.getCurrentWindow();
        jest.spyOn(currentWindow, 'unmaximize').mockImplementation();
        jest.spyOn(currentWindow, 'maximize').mockImplementation();
        jest.spyOn(currentWindow, 'on').mockImplementation(function listenerFn(
            this: BrowserWindow,
            event,
            listener,
        ) {
            listener({} as any, {} as any);
            return this;
        });
    });

    it('should mounted', () => {
        expect.hasAssertions();
        const wrapper = mount<
            titleBar & {
                maximize: ActionItem;
                unmaximize: ActionItem;
                currentWindow: BrowserWindow;
            }
        >(titleBar);

        expect(wrapper.vm.$options.name).toStrictEqual('title-bar-');
        wrapper.vm.unmaximize.call();
        wrapper.vm.maximize.call();
        wrapper.vm.$destroy();
    });
});
