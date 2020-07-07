/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import { Stats } from 'fs';
import { FileSystemObject } from '~/modules/explorer/types';

const file: FileSystemObject = {
    index: 0,
    selected: false,
    key: 'key',
    path: '',
    name: '',
    ext: 'jpg',
    isFolder: false,
    stat: {} as Stats,
};

describe('modules/explorer/analyze/images/images', () => {
    const importAnalyze = () =>
        import('~/modules/explorer/analyze/images/images');

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it('should analyze image', async () => {
        expect.hasAssertions();

        jest.mock('util', () => ({
            promisify: (input: Function) => {
                if (input === jest.requireActual('fs').open) return () => 0;
                return async () => {};
            },
        }));
        jest.mock('~/utils', () => ({
            readBuffer: async () => Buffer.from('9999', 'hex'),
        }));
        jest.mock('~/modules/explorer/analyze/images/src/psd', () => ({
            psd: {
                sign: '9999',
                data: async () => ({ color: '', dimensions: { x: 0, y: 0 } }),
            },
        }));

        const { analyzeImage } = await importAnalyze();
        const image = await analyzeImage(file);
        expect(image).toStrictEqual({ color: '', dimensions: { x: 0, y: 0 } });
    });

    it("shouldn't analyze image (no stat)", async () => {
        expect.hasAssertions();

        jest.mock('~/utils', () => ({
            readBuffer: () => undefined,
        }));

        const { analyzeImage } = await importAnalyze();

        await expect(() =>
            analyzeImage({ ...file, stat: undefined }),
        ).rejects.toThrow('File stat is undefined');
    });

    it('should analyze images', async () => {
        expect.hasAssertions();

        jest.mock('~/utils', () => ({
            readBuffer: async () => Buffer.from('0000', 'hex'),
        }));
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
            data: {
                key: 'key-analyzed',
            },
            file: {
                ext: 'jpg',
                index: 0,
                isFolder: false,
                key: 'key',
                name: '',
                path: '',
                selected: false,
                stat: {},
            },
        });
    });
});
