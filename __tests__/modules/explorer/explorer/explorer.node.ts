/* eslint-disable @typescript-eslint/ban-types */
import { mock, actual } from '~/__tests__/__utils__';
import { FileExplorerObject } from '~/modules/explorer/types';

describe('modules/explorer/explorer/explorer', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('should explore disk', async () => {
        expect.hasAssertions();

        jest.setMock('~/modules/explorer/explorer/files/disks', {
            disks: async () => [],
        });

        const { explorer } = await import('~/modules/explorer');

        expect(await explorer('')).toStrictEqual({ files: [], folders: [] });
    });

    it('should explore invalid folder path', async () => {
        expect.hasAssertions();

        mock.util({
            promisify: (fn: Function) =>
                fn === actual.fs.readdir
                    ? async () => new Error()
                    : actual.util.promisify(fn),
        });

        const { explorer } = await import('~/modules/explorer');

        expect(await explorer('an invalid folder path')).toBeUndefined();
    });

    it('should explore valid folder path', async () => {
        expect.hasAssertions();

        mock.util({
            promisify: (fn: Function) =>
                fn === actual.fs.readdir
                    ? async () => ['file', 'file', 'folder', 'folder', 'null']
                    : actual.util.promisify(fn),
        });

        jest.setMock('~/modules/explorer/explorer/files/analyze', {
            analyze: async (
                folderPath: string,
                fileOrFolder: string,
            ): Promise<FileExplorerObject | null> => {
                const file: FileExplorerObject = {
                    index: 0,
                    selected: false,
                    key: 'key',
                    path: '',
                    name: '',
                    ext: 'jpg',
                    isFolder: false,
                };

                if (fileOrFolder === 'file') return file;
                if (fileOrFolder === 'folder')
                    return { ...file, isFolder: true };
                return null;
            },
        });

        const { explorer } = await import('~/modules/explorer');

        const data = await explorer('a valid folder path');
        expect(data).toBeDefined();
        expect(data?.files).toHaveLength(2);
        expect(data?.folders).toHaveLength(2);
    });
});
