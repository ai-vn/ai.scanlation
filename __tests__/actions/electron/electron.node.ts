import { call } from '~/__tests__/__utils__/actions';

describe('actions/electron/**', () => {
    describe('windows', () => {
        it('should not throw error', async () => {
            expect.assertions(0);

            await call(a => a.electron.windows);
        });
    });

    describe('dev', () => {
        it('should toggle dev tools', async () => {
            expect.assertions(0);

            await call(a => a.electron.dev.toggleDevTools);
        });
    });
});
