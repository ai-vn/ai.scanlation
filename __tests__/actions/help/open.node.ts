import { call } from '~/__tests__/__utils__';

describe('actions/help/openExternal', () => {
    it('should check for updates', async () => {
        expect.assertions(0);

        await call(a => a.help.open.facebook);
    });
});
