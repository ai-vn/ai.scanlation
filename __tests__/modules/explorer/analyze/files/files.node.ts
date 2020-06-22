import { mock } from '~/__tests__/__utils__/mock';

describe('modules/explorer/analyze/files/files', () => {
    const folderPath = 'C://project/chapter/01';
    const file = '01.jpg';
    const folder = 'redraw';

    beforeEach(() => {
        jest.resetModules();
        mock('~/utils', ['system/async']);
    });

    it('should return null', async () => {
        expect.hasAssertions();

        const { analyze } = await import(
            '~/modules/explorer/analyze/files/files'
        );

        const data = await analyze(folderPath, file);
        expect(data).toBeNull();
    });

    it('should return files', async () => {
        expect.hasAssertions();

        jest.mock('util', () => ({
            promisify: jest.fn().mockReturnValue(async () => ({
                isDirectory: () => false,
                isFile: () => true,
                mtime: new Date(),
                size: 100,
            })),
        }));

        const { analyze } = await import(
            '~/modules/explorer/analyze/files/files'
        );

        const data = await analyze(folderPath, file);

        expect(data).toBeDefined();
        expect(data?.isFolder).toBeFalse();
    });

    it('should return folders', async () => {
        expect.hasAssertions();

        jest.mock('util', () => ({
            promisify: jest.fn().mockReturnValue(async () => ({
                isDirectory: () => true,
                isFile: () => false,
                mtime: new Date(),
                size: 100,
            })),
        }));

        const { analyze } = await import(
            '~/modules/explorer/analyze/files/files'
        );

        const data = await analyze(folderPath, folder);

        expect(data).toBeDefined();
        expect(data?.isFolder).toBeTrue();
    });
});
