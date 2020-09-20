/* eslint-disable @typescript-eslint/ban-types */
import { actual, mock } from '~/__tests__/__utils__';
import { FileReaderObject } from '~/modules/reader/types';

describe('modules/reader/reader/reader', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('should reader', async () => {
        expect.hasAssertions();

        const { reader } = await import('~/modules/reader');
        expect(await reader('')).toStrictEqual({ files: [] });
    });

    it('should read invalid folder path', async () => {
        expect.hasAssertions();

        mock.util({
            promisify: (fn: Function) =>
                fn === actual.fs.readdir
                    ? async () => new Error()
                    : actual.util.promisify(fn),
        });

        const { reader } = await import('~/modules/reader');

        expect(await reader('an invalid folder path')).toBeUndefined();
    });

    it('should read valid folder path', async () => {
        expect.hasAssertions();

        mock.util({
            promisify: (fn: Function) =>
                fn === actual.fs.readdir
                    ? async () => ['jpg', 'txt']
                    : actual.util.promisify(fn),
        });

        jest.setMock('~/modules/reader/reader/analyze', {
            analyze: async (
                folderPath: string,
                name: string,
            ): Promise<FileReaderObject | null> => ({
                index: 0,
                name,
                path: '',
                ext: name,
                size: 0,
                scroll: { top: 0, bottom: 0 },
            }),
        });

        const { reader } = await import('~/modules/reader');

        const data = await reader('a valid folder path');
        expect(data).toBeDefined();
        expect(data?.files).toHaveLength(1);
    });
});
