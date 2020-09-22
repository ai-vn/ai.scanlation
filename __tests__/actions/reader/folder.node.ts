import { call, store } from '~/__tests__/__utils__';

describe('actions/reader/folder/**', () => {
    beforeAll(async () => {
        await store('reader');
    });

    it('should open folder', async () => {
        expect.assertions(0);

        jest.setMock('~/actions/utils', { openFolder: jest.fn() });
        await call(a => a.reader.folder.open);
    });

    it('should reload reader', async () => {
        expect.assertions(0);

        await call(a => a.reader.folder.reload);
    });
});
