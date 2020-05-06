import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { plugins } from '~/store';

describe('store/index', () => {
    let store: Store<any>;

    beforeAll(() => {
        const vue = createLocalVue();
        vue.use(Vuex);
    });

    it('should generate store with plugins', () => {
        expect.hasAssertions();
        store = new Vuex.Store({ plugins });
        expect(store).toBeDefined();
    });
});
