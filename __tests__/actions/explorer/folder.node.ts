import { remote } from 'electron';
import { call, store } from '~/__tests__/__utils__';

describe('actions/explorer/folder/**', () => {
    let explorer: import('~/store/explorer').default;

    beforeAll(async () => {
        explorer = await store('explorer');
    });

    it.each([
        [true, []],
        [false, ['folderPath']],
    ])('should open folder', async (canceled, filePaths) => {
        expect.assertions(0);

        jest.spyOn(remote.dialog, 'showOpenDialog').mockImplementation(
            async () => ({
                canceled,
                filePaths,
            }),
        );

        await call(a => a.explorer.folder.open);
    });

    it('should throw error', async () => {
        expect.assertions(0);

        jest.spyOn(remote.dialog, 'showOpenDialog').mockImplementation(
            async () => {
                throw new Error();
            },
        );

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

    it('shoud reload explorer', async () => {
        expect.assertions(0);

        await call(a => a.explorer.folder.reload);
    });
});
