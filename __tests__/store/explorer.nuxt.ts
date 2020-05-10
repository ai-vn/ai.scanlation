import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Explorer from '~/store/explorer';

describe('store/explorer', () => {
    let store: Store<any>;

    beforeAll(() => {
        const vue = createLocalVue();
        vue.use(Vuex);
        store = new Vuex.Store({ modules: { explorer: Explorer } });
    });

    it('should generate module `explorer`', () => {
        expect.hasAssertions();

        const explorer = getModule(Explorer, store);
        expect(explorer.filePath).toStrictEqual('');
        explorer.setFilePath('C://');
        expect(explorer.filePath).toStrictEqual('C://');
    });
});
