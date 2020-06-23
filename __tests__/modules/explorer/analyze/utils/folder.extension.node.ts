import { getFolderType } from '~/modules/explorer/analyze/utils/folder.extension';

describe('modules/explorer/analyze/utils/folder.extension', () => {
    it('should return folder type', () => {
        expect.hasAssertions();

        expect(getFolderType('Complete')).toStrictEqual('folder_complete');
        expect(getFolderType('not match any pattern')).toStrictEqual('folder');
    });
});
