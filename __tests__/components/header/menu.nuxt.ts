import { shallowMount } from '@vue/test-utils';
import { Vue } from 'nuxt-property-decorator';
import { mock } from '~/__tests__/__utils__/mock';

describe('components/header/menu', () => {
    beforeAll(async () => {
        jest.mock('~/actions/actions.import', () => ({ actions: {} }));
        mock('~/utils', ['decorators/action', 'decorators/render']);

        const menuItem = await import('~/components/header/menu-item.vue');
        const icon = await import('~/components/utilities/icon.vue');

        Vue.component('icon-', icon);
        Vue.component('menu-item-', menuItem);
    });

    it('should mounted', async () => {
        expect.hasAssertions();

        const { default: menu } = await import('~/components/header/menu.vue');

        const wrapper = shallowMount(menu);
        expect(wrapper.vm.$options.name).toStrictEqual('menu-');
    });
});
