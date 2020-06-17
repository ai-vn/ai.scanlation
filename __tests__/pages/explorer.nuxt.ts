/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-new */
import { shallowMount } from '@vue/test-utils';
import { Vue } from 'nuxt-property-decorator';
import Vuex from 'vuex';
import table from '~/components/table/table.vue';
import button from '~/components/utilities/button.vue';
import icon from '~/components/utilities/icon.vue';
import { mock } from '~/__tests__/__utils__/mock';
import input from '~/components/utilities/input.vue';
import group from '~/components/utilities/group.vue';
import '~/plugins/v-tooltip';

describe('pages/explorer', () => {
    beforeAll(async () => {
        jest.mock('~/actions/actions.import', () => ({
            actions: {
                selectFolder: { call: () => {} },
                goToParentFolder: { call: () => {} },
            },
        }));

        mock('~/modules/explorer', ['table']);

        const { default: Explorer } = await import('~/store/explorer');
        const { plugins } = await import('~/store');

        Vue.use(Vuex);
        new Vuex.Store({ plugins, modules: { explorer: Explorer } });

        Vue.component('button-', button);
        Vue.component('icon-', icon);
        Vue.component('input-', input);
        Vue.component('table-', table);
        Vue.component('group-', group);
    });

    it('should', async () => {
        expect.hasAssertions();

        const { default: explorer } = await import('~/pages/explorer.vue');

        const wrapper = shallowMount(explorer, {});
        expect(wrapper.vm.$options.name).toStrictEqual('explorer-');
    });
});
