describe('actions/explorer/open', () => {
    beforeEach(async () => {
        jest.resetModules();

        jest.mock('~/store', () => ({ explorer: { folderPath: '' } }));
        jest.mock('electron', () => ({
            shell: { showItemInFolder: jest.fn() },
        }));

        jest.mock('~/utils', () => ({
            execute: jest.fn(),
        }));
    });

    it.each([[true], [false]])('should show item in folder', async isExist => {
        expect.assertions(0);

        jest.doMock('fs', () => ({ existsSync: () => isExist }));

        const { showFolder } = await import('~/actions/explorer/item');
        showFolder.call();
    });

    it('should open in photoshop', async () => {
        expect.assertions(0);

        jest.mock('~/store', () => ({
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
        }));

        const { openInPhotoshop } = await import('~/actions/explorer/item');
        openInPhotoshop.call();
    });

    it('should not open in photoshop', async () => {
        expect.assertions(0);

        jest.mock('~/store', () => ({ explorer: { files: [] } }));

        const { openInPhotoshop } = await import('~/actions/explorer/item');
        openInPhotoshop.call();
    });
});
