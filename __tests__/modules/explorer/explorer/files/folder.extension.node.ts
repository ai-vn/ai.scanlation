import { getFolderType } from '~/modules/explorer/explorer/files/folder.extension';

describe('modules/explorer/explorer/files/folder.extension', () => {
    it('should return folder type', () => {
        expect.hasAssertions();

        expect(getFolderType('Complete')).toStrictEqual('folder_complete');
        expect(getFolderType('not match any pattern')).toStrictEqual('folder');
    });
});
