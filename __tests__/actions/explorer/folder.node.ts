import { call, store } from '~/__tests__/__utils__';

describe('actions/explorer/folder/**', () => {
    let explorer: import('~/store/explorer').default;

    beforeAll(async () => {
        explorer = await store('explorer');
    });

    it('should open folder', async () => {
        expect.assertions(0);

        jest.setMock('~/actions/utils', { openFolder: jest.fn() });
        await call(a => a.explorer.folder.open);
    });

    it.each([[''], ['C:/'], ['C:/manga']])(
        'should go to parent folder',
        async folderPath => {
            expect.assertions(0);

            explorer.setFolderPath(folderPath);
            await call(a => a.explorer.folder.goToParent);
        },
    );

    it('should reload explorer', async () => {
        expect.assertions(0);

        await call(a => a.explorer.folder.reload);
    });
});
