import { join } from 'path';
import { mock } from '~/__tests__/__utils__';
import { toExt } from '~/utils';

describe('modules/reader/reader/analyze', () => {
    const folderPath = 'C://project/chapter/01';
    const file = '01.jpg';

    beforeEach(() => {
        jest.resetModules();
    });

    it('should return null', async () => {
        expect.hasAssertions();

        mock.util({
            promisify: jest.fn().mockReturnValue(async () => {
                throw new Error();
            }),
        });
        const { analyze } = await import('~/modules/reader/reader/analyze');
        const data = await analyze(folderPath, file);
        expect(data).toBeNull();
    });

    it('should return folder', async () => {
        expect.hasAssertions();

        mock.util({
            promisify: jest.fn().mockReturnValue(async () => ({
                isDirectory: () => true,
            })),
        });

        const { analyze } = await import('~/modules/reader/reader/analyze');
        const data = await analyze(folderPath, file);
        expect(data).toBeNull();
    });

    it('should return file', async () => {
        expect.hasAssertions();

        mock.util({
            promisify: jest.fn().mockReturnValue(async () => ({
                isDirectory: () => false,
                size: 0,
            })),
        });

        const { analyze } = await import('~/modules/reader/reader/analyze');
        const data = await analyze(folderPath, file);
        expect(data).toStrictEqual({
            index: 0,
            name: file,
            path: join(folderPath, file),
            scroll: { top: 0, bottom: 0 },
            ext: toExt(file),
            size: 0,
        });
    });
});
