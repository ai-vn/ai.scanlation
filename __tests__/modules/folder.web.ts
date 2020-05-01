import { remote } from 'electron';
import { actions } from '~/modules/actions.import';

describe('module: folder', () => {
    it.each([
        [true, []],
        [false, ['filePath']],
    ])('should not throw error', async (canceled, filePaths) => {
        expect.hasAssertions();
        jest.spyOn(
            remote.dialog,
            'showOpenDialog',
        ).mockImplementation(async () => ({ canceled, filePaths }));

        expect(actions.selectFolder.call).not.toThrow();
    });
});
