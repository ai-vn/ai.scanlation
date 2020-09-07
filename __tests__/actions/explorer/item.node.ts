import { call, mock } from '~/__tests__/__utils__';

describe('actions/explorer/item', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it.each([[true], [false]])('should show item in folder', async isExist => {
        expect.assertions(0);

        mock.fs({ existsSync: () => isExist });
        mock.store({ explorer: { folderPath: '' } });

        await call(a => a.explorer.item.revealInFileExplorer);
    });

    it('should open in photoshop', async () => {
        expect.assertions(0);

        mock.utils({ execute: jest.fn() });
        mock.store({
            explorer: {
                files: [
                    {
                        index: 0,
                        selected: true,
                        key: 'key',
                        path: '',
                        name: '',
                        ext: 'jpg',
                        isFolder: false,
                    },
                ],
            },
        });

        await call(a => a.explorer.item.openInPhotoshop);
    });

    it('should not open in photoshop', async () => {
        expect.assertions(0);

        mock.store({ explorer: { files: [] } });

        await call(a => a.explorer.item.openInPhotoshop);
    });
});
