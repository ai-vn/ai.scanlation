import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

describe('store/index', () => {
    it('should generate store with plugins', async () => {
        expect.hasAssertions();

        const { default: Explorer } = await import('~/store/explorer');
        const { plugins } = await import('~/store');

        const vue = createLocalVue();
        vue.use(Vuex);
        const store = new Vuex.Store({
            plugins,
            modules: { explorer: Explorer },
        });

        expect(store).toBeInstanceOf(Store);
    });
});
