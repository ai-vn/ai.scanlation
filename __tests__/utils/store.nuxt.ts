import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { initializeStore } from '~/utils/store';

describe('utils/store', () => {
    let store: Store<any>;

    beforeAll(() => {
        const vue = createLocalVue();
        vue.use(Vuex);
        store = new Vuex.Store({});
    });

    it('should pass', () => {
        expect.hasAssertions();
        expect(() => initializeStore(store)).not.toThrow();
    });
});
