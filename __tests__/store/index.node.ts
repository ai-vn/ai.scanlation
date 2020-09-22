import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

describe('store/index', () => {
    it('should generate store with plugins', async () => {
        expect.hasAssertions();

        const { default: Explorer } = await import('~/store/explorer');
        const { default: Reader } = await import('~/store/reader');
        const { plugins } = await import('~/store');

        const vue = createLocalVue();
        vue.use(Vuex);

        const store = new Vuex.Store({
            plugins,
            modules: {
                explorer: Explorer,
                reader: Reader,
            },
        });

        expect(store).toBeInstanceOf(Store);
    });
});
