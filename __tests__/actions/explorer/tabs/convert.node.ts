import { call, store } from '~/__tests__/__utils__';

describe('actions/explorer/folder/tabs/convert', () => {
    beforeAll(async () => {
        await store('explorer');
    });

    it('should select convert target folder', async () => {
        expect.assertions(0);

        jest.setMock('~/actions/utils', { openFolder: jest.fn() });
        await call(a => a.explorer.tabs.convert.selectTargetFolderPath);
    });
});
