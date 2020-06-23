import Vue from 'vue';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import { requireActual, mock } from '~/__tests__/__utils__/mock';

describe('actions/folder/**', () => {
    let explorer: any;

    beforeEach(async () => {
        jest.resetModules();

        mock('~/utils', ['decorators/store.watch', 'system/async']);
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

    it.each([
        [true, []],
        [false, ['folderPath']],
    ])('should not throw error', async (canceled, filePaths) => {
        expect.assertions(0);

        jest.doMock('electron', () => ({
            remote: {
                dialog: {
                    showOpenDialog: async () => ({ canceled, filePaths }),
                },
            },
        }));

        const { actions } = await import('~/actions/actions.import');

        await actions.selectFolder.call();
    });

    it('should throw error', async () => {
        expect.assertions(0);

        jest.doMock('electron', () => ({
            remote: {
                dialog: {
                    showOpenDialog: async () => {
                        throw new Error();
                    },
                },
            },
        }));

        const { actions } = await import('~/actions/actions.import');

        await actions.selectFolder.call();
    });

    it.each([[''], ['C:/'], ['C:/manga']])(
        'should go to parent folder',
        async folderPath => {
            expect.assertions(0);

            const { actions } = await import('~/actions/actions.import');

            explorer.setFolderPath(folderPath);
            actions.goToParentFolder.call();
        },
    );
});
