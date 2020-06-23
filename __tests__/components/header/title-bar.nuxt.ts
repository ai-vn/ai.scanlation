/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { shallowMount } from '@vue/test-utils';
import { Vue } from 'nuxt-property-decorator';
import { mock } from '~/__tests__/__utils__/mock';

describe('components/header/title-bar', () => {
    beforeAll(async () => {
        jest.mock('~/actions/actions.import', () => ({
            actions: {
                minimize: { call: () => {} },
                maximize: { call: () => {} },
                unmaximize: { call: () => {} },
                close: { call: () => {} },
            },
        }));
        mock('~/utils', ['decorators/action', 'decorators/render']);

        const icon = await import('~/components/utilities/icon.vue');
        const menu = await import('~/components/header/menu.vue');
        const menuItem = await import('~/components/header/menu-item.vue');

        Vue.component('icon-', icon);
        Vue.component('menu-', menu);
        Vue.component('menu-item-', menuItem);

        jest.mock('electron', () => ({
            remote: {
                getCurrentWindow: () => ({
                    unmaximize() {},
                    maximize() {},
                    isMaximized: () => true,
                    on(event: string, listener: Function) {
                        listener({}, {});
                        return this;
                    },
                }),
            },
        }));
    });

    it('should mounted', async () => {
        expect.hasAssertions();

        const { default: titleBar } = await import(
            '~/components/header/title-bar.vue'
        );

        const wrapper = shallowMount(titleBar);

        expect(wrapper.vm.$options.name).toStrictEqual('title-bar-');
        wrapper.vm.$destroy();
    });
});
