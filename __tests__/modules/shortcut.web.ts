/* eslint-disable no-extend-native */
import { actions } from '~/modules/actions.import';

declare global {
    interface Object {
        testExtendNative: string;
    }
}

describe('module: shortcut', () => {
    beforeAll(() => {
        Object.prototype.testExtendNative = '';
    });

    afterAll(() => {
        delete Object.prototype.testExtendNative;
    });

    it('should work', () => {
        expect.hasAssertions();

        expect(actions.resetMousetrap.call).not.toThrow();
    });
});
