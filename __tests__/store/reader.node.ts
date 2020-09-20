import { store } from '~/__tests__/__utils__/store';

describe('store/reader', () => {
    let reader: import('~/store/reader').default;

    beforeAll(async () => {
        jest.setMock('~/modules/reader', {
            reader: jest.fn().mockReturnValue({ files: [] }),
        });
        reader = await store('reader');
    });

    it('should update folderPath & data', () => {
        expect.assertions(0);

        reader.setFolderPath('C://folder');
        reader.updateFolderPath();
        reader.setData();
        reader.setData({
            files: [
                {
                    index: 0,
                    name: 'image',
                    path: 'image-path',
                    ext: '',
                    size: 0,
                    scroll: { top: 0, bottom: 0 },
                },
            ],
        });
        reader.updateFile({
            file: reader.files[0],
            data: { size: 10 },
        });
    });

    it('should watch folderPath', async () => {
        expect.assertions(0);

        await reader.watchFolderPath({ value: '', oldValue: '~' });
        await reader.watchFolderPath({ value: '', oldValue: '' });
        await reader.watchFolderPath({ value: '.', oldValue: '' });
    });

    it('should toggle show list', () => {
        expect.hasAssertions();

        expect(reader.isShowList).toBeTrue();
        reader.toggleShowList();
        expect(reader.isShowList).toBeFalse();
    });

    it('should toggle space', () => {
        expect.hasAssertions();

        expect(reader.isSpace).toBeTrue();
        reader.toggleSpace();
        expect(reader.isSpace).toBeFalse();
    });
});
