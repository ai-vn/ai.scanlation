import { FileSystemObject } from '~/modules/explorer/types';

const file: FileSystemObject = {
    index: 0,
    selected: false,
    key: 'key',
    path: '',
    name: '',
    ext: 'jpg',
    isFolder: false,
};

describe('modules/explorer/analyze/images/images', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it("shouldn't analyze image", async () => {
        expect.hasAssertions();

        jest.mock('util', () => ({
            promisify: jest
                .fn()
                .mockReturnValue(async () => Buffer.from('0000', 'hex')),
        }));

        const { analyzeImage } = await import(
            '~/modules/explorer/analyze/images/images'
        );
        const image = await analyzeImage(file);
        expect(image).toBeUndefined();
    });

    it('should analyze image', async () => {
        expect.hasAssertions();

        jest.mock('util', () => ({
            promisify: jest
                .fn()
                .mockReturnValue(async () => Buffer.from('ffd8', 'hex')),
        }));

        const { analyzeImage } = await import(
            '~/modules/explorer/analyze/images/images'
        );
        const image = await analyzeImage(file);
        expect(image).toBeDefined();
    });

    it('should analyze images', async () => {
        expect.hasAssertions();

        jest.mock('util', () => ({
            promisify: jest
                .fn()
                .mockReturnValue(async () => Buffer.from('ffd8', 'hex')),
        }));

        const { analyzeImages } = await import(
            '~/modules/explorer/analyze/images/images'
        );

        const callback = jest.fn();
        await analyzeImages([file], callback);

        expect(callback).toHaveBeenCalledWith({
            path: '',
            key: `key-analyzed`,
            color: 'File Error',
            dimensions: {
                x: 0,
                y: 0,
            },
        });
    });
});
