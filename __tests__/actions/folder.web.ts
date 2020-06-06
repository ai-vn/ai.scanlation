import { remote } from 'electron';
import { actions } from '~/actions/actions.import';

describe('actions/folder/**', () => {
    it.each([
        [true, []],
        [false, ['folderPath']],
    ])('should not throw error', async (canceled, filePaths) => {
        expect.hasAssertions();
        jest.spyOn(
            remote.dialog,
            'showOpenDialog',
        ).mockImplementation(async () => ({ canceled, filePaths }));

        expect(actions.selectFolder.call).not.toThrow();
    });
});
