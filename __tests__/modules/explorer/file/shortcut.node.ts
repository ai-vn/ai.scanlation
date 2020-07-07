describe('modules/explorer/file/shortcut', () => {
    beforeAll(() => {
        jest.mock('~/store', () => ({
            explorer: {
                setFolderPath: jest.fn(),
            },
        }));
        jest.mock('electron', () => ({
            shell: { readShortcutLink: () => ({ target: '', cwd: '' }) },
        }));
    });

    it.each([
        ['folder', true],
        ['file', false],
    ])('shoud open %p shortcut', async (_name, isDirectory) => {
        expect.assertions(0);

        jest.resetModules();
        jest.doMock('fs', () => ({
            statSync: () => ({ isDirectory: () => isDirectory }),
        }));

        const { openShortcut } = await import(
            '~/modules/explorer/file/shortcut'
        );

        openShortcut('');
    });

    it("shouldn't open shortcut", async () => {
        expect.assertions(0);

        jest.resetModules();
        jest.mock('lodash', () => ({
            isError: jest.requireActual('lodash').isError,
            attempt: () => undefined,
        }));

        const { openShortcut } = await import(
            '~/modules/explorer/file/shortcut'
        );

        openShortcut('');
    });
});
