import { Vue } from 'nuxt-property-decorator';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import { mock, requireActual } from '~/__tests__/__utils__/mock';
import { FileSystemObject } from '~/modules/explorer/types';

const file: FileSystemObject = {
    index: 0,
    selected: false,
    key: 'key',
    path: '',
    name: '',
    ext: 'jpg',
    isFolder: false,
};

describe('actions/explorer/select', () => {
    let explorer: import('~/store/explorer').default;

    beforeEach(async () => {
        jest.resetModules();

        mock('~/utils', ['decorators/store.watch']);
        mock('~/modules/explorer', [
            'analyze/explorer',
            'analyze/images/images',
        ]);
        jest.mock('~/actions/actions.import', () => ({
            actions: requireActual('~/actions/folder/folder'),
        }));

        const { default: Explorer } = await import('~/store/explorer');
        const { plugins } = await import('~/store');

        Vue.use(Vuex);
        const store = new Vuex.Store({
            plugins,
            modules: { explorer: Explorer },
        });
        explorer = getModule(Explorer, store);
    });

    it('should select all', async () => {
        expect.assertions(0);

        const { selectAll } = await import('~/actions/explorer/select');

        explorer.setData({ files: [], folders: [] });
        selectAll.call();

        explorer.setData({
            files: [
                { ...file, path: 'a', selected: false },
                { ...file, path: 'b', selected: true },
            ],
            folders: [],
        });
        selectAll.call();
        selectAll.call();
        selectAll.call();
    });
});
