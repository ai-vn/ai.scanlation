/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-extend-native */
import mousetrap, { ExtendedKeyboardEvent, MousetrapInstance } from 'mousetrap';

describe('actions/shortcut', () => {
    beforeAll(() => {
        mousetrap.reset();

        jest.spyOn(mousetrap, 'bind').mockImplementation(
            (
                key_: string | string[],
                action: (e: ExtendedKeyboardEvent, combo: string) => any,
            ) => {
                action({} as ExtendedKeyboardEvent, '');
                return {} as MousetrapInstance;
            },
        );
    });

    it('should work', async () => {
        expect.assertions(0);

        jest.mock('~/actions', () => ({
            isAction: jest.requireActual('~/actions/isAction').isAction,
            actions: {
                a: { call: () => {} },
                b: { call: () => {}, accelerator: 'B' },
                c: { call: () => {}, accelerator: 'C', condition: () => true },
                d: { call: () => {}, accelerator: 'D', condition: () => false },
            },
        }));

        const { reset } = await import('~/actions/settings/shortcut');
        reset.call();
    });
});
