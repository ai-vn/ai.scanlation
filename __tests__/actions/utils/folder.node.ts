import { remote } from 'electron';

describe('actions/explorer/folder/**', () => {
    it.each([
        [true, []],
        [false, ['folderPath']],
    ])('should open folder', async (canceled, filePaths) => {
        expect.hasAssertions();

        jest.spyOn(remote.dialog, 'showOpenDialog').mockImplementation(
            async () => ({
                canceled,
                filePaths,
            }),
        );

        const { openFolder } = await import('~/actions/utils');

        const callback = jest.fn();
        await openFolder(callback);

        if (canceled) expect(callback).not.toHaveBeenCalled();
        else expect(callback).toHaveBeenCalledWith(...filePaths);
    });

    it('should throw error', async () => {
        expect.hasAssertions();

        jest.spyOn(remote.dialog, 'showOpenDialog').mockImplementation(
            async () => {
                throw new Error();
            },
        );
        const { openFolder } = await import('~/actions/utils');

        const callback = jest.fn();
        openFolder(callback);

        expect(callback).not.toHaveBeenCalled();
    });
});
