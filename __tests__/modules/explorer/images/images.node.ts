/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import { Stats } from 'fs';
import { mock } from '~/__tests__/__utils__';
import { mockInstance } from '~/__tests__/__utils__/mock';
import { AnalyzeImage } from '~/modules/explorer/images/type';
import { FileExplorerObject } from '~/modules/explorer/types';
import type Explorer from '~/store/explorer';

const file: FileExplorerObject = {
    index: 0,
    selected: false,
    key: 'key',
    path: '',
    name: '',
    ext: 'jpg',
    isFolder: false,
    stat: {} as Stats,
};

describe('modules/explorer/images/images', () => {
    const importAnalyze = () => import('~/modules/explorer/images/images');

    beforeEach(() => {
        jest.resetModules();
    });

    beforeAll(() => {
        mock.utils({
            readBuffer: async () => Buffer.from('9999', 'hex'),
        });
        mock.util({
            promisify: jest
                .fn()
                .mockImplementation((input: Function) =>
                    input === jest.requireActual('fs').open
                        ? () => 0
                        : async () => {},
                ),
        });
        jest.setMock<{ psd: AnalyzeImage }>(
            '~/modules/explorer/images/src/psd',
            {
                psd: {
                    sign: '9999',
                    data: async () => ({
                        color: '',
                        dimensions: { x: 0, y: 0 },
                    }),
                },
            },
        );
    });

    it('should analyze image', async () => {
        expect.hasAssertions();

        const { analyzeImage } = await importAnalyze();
        const image = await analyzeImage(file);
        expect(image).toStrictEqual({ color: '', dimensions: { x: 0, y: 0 } });
    });

    it("shouldn't analyze image (no find)", async () => {
        expect.hasAssertions();

        mock.utils({
            readBuffer: async () => Buffer.from('1234', 'hex'),
        });

        const { analyzeImage } = await importAnalyze();
        const image = await analyzeImage(file);
        expect(image).toBeUndefined();
    });

    it("shouldn't analyze image (no stat)", async () => {
        expect.hasAssertions();

        const { analyzeImage } = await importAnalyze();

        await expect(() =>
            analyzeImage({ ...file, stat: undefined }),
        ).rejects.toThrow('File stat is undefined');
    });

    it('should analyze images', async () => {
        expect.hasAssertions();

        const { analyzeImages } = await import(
            '~/modules/explorer/images/images'
        );
        const explorer = mockInstance<Explorer>({
            files: [file],
            updateFile: jest.fn(),
        });

        await analyzeImages(explorer);

        expect(explorer.updateFile).toHaveBeenCalledWith({
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
