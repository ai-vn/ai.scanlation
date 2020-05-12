import { remote } from 'electron';
import { actions } from '~/modules/actions.import';

describe('modules/folder/**', () => {
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
