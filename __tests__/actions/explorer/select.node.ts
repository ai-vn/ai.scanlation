import { store } from '~/__tests__/__utils__';
import { FileExplorerObject } from '~/modules/explorer/types';

const file: FileExplorerObject = {
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

    beforeAll(async () => {
        explorer = await store('explorer');
    });

    it('should select all', async () => {
        expect.assertions(0);

        const { toggleAll } = await import('~/actions/explorer/select');

        explorer.setData({ files: [], folders: [] });
        toggleAll.call();

        explorer.setData({
            files: [
                { ...file, path: 'a', selected: false },
                { ...file, path: 'b', selected: true },
            ],
            folders: [],
        });
        toggleAll.call();
        toggleAll.call();
        toggleAll.call();
    });
});
