import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import { store } from '~/__tests__/__utils__';
import table from '~/components/table/table.vue';
import button from '~/components/utilities/button.vue';
import group from '~/components/utilities/group.vue';
import icon from '~/components/utilities/icon/icon.vue';
import input from '~/components/utilities/input.vue';
import '~/plugins/v-tooltip';

describe('pages/explorer', () => {
    beforeAll(async () => {
        await store('explorer');

        Vue.component('button-', button);
        Vue.component('group-', group);
        Vue.component('icon-', icon);
        Vue.component('input-', input);
        Vue.component('table-', table);
    });

    it('should render page explorer', async () => {
        expect.hasAssertions();

        const { default: explorer } = await import('~/pages/explorer.vue');

        const wrapper = shallowMount(explorer, {});
        expect(wrapper.vm.$options.name).toStrictEqual('explorer-');
    });
});
