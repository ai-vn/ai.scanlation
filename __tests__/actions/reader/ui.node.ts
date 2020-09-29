import { call, store } from '~/__tests__/__utils__';

describe('actions/reader/ui', () => {
    beforeAll(async () => {
        await store('reader');
    });

    it('should toggle show list', async () => {
        expect.assertions(0);

        await call(a => a.reader.ui.toggleShowList);
    });

    it('should toggle space', async () => {
        expect.assertions(0);

        await call(a => a.reader.ui.toggleSpace);
    });
});
