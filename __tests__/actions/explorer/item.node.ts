import fs from 'fs';
import { call, mock, store } from '~/__tests__/__utils__';
import { FileExplorerObject } from '~/modules/explorer/types';

const file: FileExplorerObject = {
    index: 0,
    selected: true,
    key: 'key',
    path: '',
    name: '',
    ext: 'jpg',
    isFolder: false,
};

describe('actions/explorer/item.photothop', () => {
    let explorer: import('~/store/explorer').default;

    beforeAll(async () => {
        explorer = await store('explorer');
        mock.utils({ execute: jest.fn() });
    });

    it('should read current folder', async () => {
        expect.assertions(0);

        jest.setMock('~/actions/routers', { goToReader: jest.fn() });
        await call(a => a.explorer.item.readCurrentFolder);
    });

    it.each([[true], [false]])('reveal in file explorer', async isExist => {
        expect.assertions(0);

        jest.spyOn(fs, 'existsSync').mockImplementation(() => isExist);
        await call(a => a.explorer.item.revealInFileExplorer);
    });

    it.each([[[]], [[file]]])('should open in photoshop', async files => {
        expect.assertions(0);

        explorer.setData({
            folders: [],
            files,
        });

        await call(a => a.explorer.item.openInPhotoshop);
    });
});
