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

        jest.mock('mousetrap', () => ({
            reset: jest.requireActual('mousetrap').reset,
            bind(
                key_: string,
                action: (e: ExtendedKeyboardEvent, combo: string) => any,
            ) {
                action({} as ExtendedKeyboardEvent, '');
                return {} as MousetrapInstance;
            },
        }));

        Object.prototype.testExtendNative = '';
    });

    afterAll(() => {
        delete Object.prototype.testExtendNative;
    });

    it('should work', async () => {
        expect.assertions(0);

        jest.mock('~/actions/actions.import', () => ({
            actions: {
                a: { call: () => {} },
                b: { call: () => {}, accelerator: 'B' },
                c: { call: () => {}, accelerator: 'C', condition: () => true },
                d: { call: () => {}, accelerator: 'D', condition: () => false },
            },
        }));

        const { resetMousetrap } = await import('~/actions/shortcut/reset');
        resetMousetrap.call();
    });
});
