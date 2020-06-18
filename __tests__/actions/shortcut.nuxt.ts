/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-extend-native */
import mousetrap from 'mousetrap';

declare global {
    interface Object {
        testExtendNative: string;
    }
}

describe('actions/shortcut', () => {
    beforeAll(() => {
        jest.resetModules();
        mousetrap.reset();

        Object.prototype.testExtendNative = '';
    });

    afterAll(() => {
        delete Object.prototype.testExtendNative;
    });

    it('should work', async () => {
        expect.assertions(0);

        jest.mock('~/actions/actions.import', () => ({
            actions: {
                a: { call: () => {}, accelerator: 'A' },
                b: { call: () => {} },
            },
        }));

        const { resetMousetrap } = await import('~/actions/shortcut/reset');
        resetMousetrap.call();
    });
});
