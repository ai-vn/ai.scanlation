import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { mock } from '~/__tests__/__utils__/mock';

describe('store/index', () => {
    it('should generate store with plugins', async () => {
        expect.hasAssertions();

        mock('~/utils', ['decorators/store.watch']);
        mock('~/modules/explorer', [
            'analyze/explorer',
            'analyze/images/images',
        ]);

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
