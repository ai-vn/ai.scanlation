import { env } from '~/__tests__/__utils__/utils.env';
import { disableSecurity } from '~/app/env';

const { save, load } = env('NODE_ENV', 'ELECTRON_SECURITY_CHECK');

describe('app/env', () => {
    beforeEach(() => {
        jest.resetModules();
        save();
    });
    afterEach(load);

    it('should disableSecurity', () => {
        expect.hasAssertions();
        expect(disableSecurity).not.toThrow();
    });

    it.each([
        ['production', 'strict', true],
        ['development', 'strict', true],
        ['production', undefined, true],
        ['development', undefined, false],
    ])(
        'should get isSecurityCheck, NODE_ENV = %p',
        (NODE_ENV, ELECTRON_SECURITY_CHECK, result) => {
            expect.hasAssertions();
            process.env.NODE_ENV = NODE_ENV;
            process.env.ELECTRON_SECURITY_CHECK = ELECTRON_SECURITY_CHECK;

            const { isSecurityCheck } = require('~/app/env');
            expect(isSecurityCheck).toStrictEqual(result);
        },
    );
});
