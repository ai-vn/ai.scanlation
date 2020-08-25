/* eslint-disable @typescript-eslint/ban-types */
import { mock } from '~/__tests__/__utils__/mock';
import { FileSystemObject } from '~/modules/explorer/types';

describe('modules/explorer/analyze/explorer', () => {
    beforeEach(() => {
        jest.resetModules();
        mock('~/modules/explorer', ['analyze/explorer']);
        mock('~/utils', ['system/async', 'system/execute']);
    });

    it('should explore disk', async () => {
        expect.hasAssertions();

        jest.mock('~/modules/explorer/analyze/files/disks', () => ({
            disks: async () => [],
        }));

        const { explorer } = await import('~/modules/explorer');

        expect(await explorer('')).toStrictEqual({ files: [], folders: [] });
    });

    it('should explore invalid folder path', async () => {
        expect.hasAssertions();

        jest.mock('util', () => ({
            promisify: (fn: Function) =>
                fn === jest.requireActual('fs').readdir
                    ? async () => new Error()
                    : jest.requireActual('util').promisify(fn),
        }));

        const { explorer } = await import('~/modules/explorer');

        expect(await explorer('an invalid folder path')).toBeUndefined();
    });

    it('should explore valid folder path', async () => {
        expect.hasAssertions();

        jest.mock('util', () => ({
            promisify: (fn: Function) =>
                fn === jest.requireActual('fs').readdir
                    ? async () => ['file', 'file', 'folder', 'folder', 'null']
                    : jest.requireActual('util').promisify(fn),
        }));
        jest.mock('~/modules/explorer/analyze/files/files', () => ({
            analyze: async (
                folderPath: string,
                fileOrFolder: string,
            ): Promise<FileSystemObject | null> => {
                const file: FileSystemObject = {
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
        }));

        const { explorer } = await import('~/modules/explorer');

        const data = await explorer('a valid folder path');
        expect(data).toBeDefined();
        expect(data?.files).toHaveLength(2);
        expect(data?.folders).toHaveLength(2);
    });
});
