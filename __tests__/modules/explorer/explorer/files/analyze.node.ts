import { mock } from '~/__tests__/__utils__';

describe('modules/explorer/explorer/files/analyze', () => {
    const folderPath = 'C://project/chapter/01';
    const file = '01.jpg';
    const folder = 'redraw';

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

        const { analyze } = await import(
            '~/modules/explorer/explorer/files/analyze'
        );

        const data = await analyze(folderPath, file);
        expect(data).toBeNull();
    });

    it('should return file', async () => {
        expect.hasAssertions();
        mock.util({
            promisify: jest.fn().mockReturnValue(async () => ({
                isDirectory: () => false,
                isFile: () => true,
                mtime: new Date(),
                size: 100,
            })),
        });

        const { analyze } = await import(
            '~/modules/explorer/explorer/files/analyze'
        );

        const data = await analyze(folderPath, file);
        expect(data).toBeDefined();
        expect(data?.isFolder).toBeFalse();
    });

    it('should return folder', async () => {
        expect.hasAssertions();

        mock.util({
            promisify: jest.fn().mockReturnValue(async () => ({
                isDirectory: () => true,
                isFile: () => false,
                mtime: new Date(),
                size: 100,
            })),
        });

        const { analyze } = await import(
            '~/modules/explorer/explorer/files/analyze'
        );

        const data = await analyze(folderPath, folder);
        expect(data).toBeDefined();
        expect(data?.isFolder).toBeTrue();
    });
});
