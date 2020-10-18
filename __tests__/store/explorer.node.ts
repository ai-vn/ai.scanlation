import { store } from '~/__tests__/__utils__';

describe('store/explorer', () => {
    let explorer: import('~/store/explorer').default;

    beforeAll(async () => {
        jest.setMock('~/modules/explorer', {
            explorer: jest.fn().mockReturnValue({ files: [], folders: [] }),
            analyzeImages: jest.fn(),
        });
        explorer = await store('explorer');
    });

    it('should update folderPath & data', () => {
        expect.assertions(0);

        explorer.setFolderPath('C://folder');
        explorer.updateFolderPath();
        explorer.setData();
        explorer.setData({
            files: [
                {
                    index: 0,
                    selected: false,
                    key: 'image-path',
                    name: 'image',
                    path: 'image-path',
                    ext: '',
                    isFolder: false,
                },
            ],
            folders: [],
        });
        explorer.updateFile({
            file: explorer.files[0],
            data: { color: 'PNG' },
        });

        explorer.toggleSelectedFile(explorer.files[0]);
    });

    it('should watchFolderPath work', async () => {
        expect.assertions(0);

        await explorer.watchFolderPath({ value: '', oldValue: '~' });
        await explorer.watchFolderPath({ value: '', oldValue: '' });
        await explorer.watchFolderPath({ value: '.', oldValue: '' });
    });

    it('should update ui', () => {
        expect.assertions(0);

        explorer.setCurrentTab('redraw');
        explorer.setProjectId(0);
        explorer.setChapterId(0);
        explorer.setStartNumber(0);

        explorer.setRenamePattern('');

        explorer.setConvertFormat('PNG');
        explorer.toggleConvertFormat();

        explorer.setConvertSubFolder(true);
        explorer.toggleConvertSubFolder();

        explorer.setConvertTargetFolderPath('');
    });
});
