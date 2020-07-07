import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import { mock } from '~/__tests__/__utils__/mock';

describe('store/explorer', () => {
    let explorer: import('~/store/explorer').default;

    beforeAll(() => {
        mock('~/utils', ['decorators/store.watch']);

        jest.mock('~/modules/explorer', () => ({
            explorer: jest.fn().mockReturnValue({ files: [], folders: [] }),
            analyzeImages: jest.fn(),
        }));
    });

    beforeEach(async () => {
        const { default: Explorer } = await import('~/store/explorer');

        const vue = createLocalVue();
        vue.use(Vuex);
        const store = new Vuex.Store({ modules: { explorer: Explorer } });
        explorer = getModule(Explorer, store);
    });

    it('should update folderPath & data', () => {
        expect.hasAssertions();

        jest.resetModules();
        jest.spyOn(explorer, 'watchFolderPath').mockImplementation();

        expect(explorer.folderPath).toStrictEqual('');

        explorer.setFolderPath('C://folder');
        explorer.updateFolderPath();
        explorer.setData();
        explorer.setData({
            files: [
                {
                    index: 0,
                    selected: false,
                    key: 'image-path',
                    name: 'image',
                    path: 'image-path',
                    ext: '',
                    isFolder: false,
                },
            ],
            folders: [],
        });
        explorer.updateFile({
            file: explorer.files[0],
            data: { color: 'PNG' },
        });

        explorer.toggleSelectedFile(explorer.files[0]);
    });

    it('should watchFolderPath work', async () => {
        expect.hasAssertions();

        jest.resetModules();
        jest.spyOn(explorer, 'setFolderPath').mockImplementation();

        explorer.setData();
        await explorer.watchFolderPath({ value: '', oldValue: '~' });
        await explorer.watchFolderPath({ value: '', oldValue: '' });
        await explorer.watchFolderPath({ value: '.', oldValue: '' });

        expect(explorer.folders).toHaveLength(0);
    });
});
