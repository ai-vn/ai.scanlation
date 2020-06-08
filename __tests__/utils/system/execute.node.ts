import { isError } from 'lodash';
import { execute } from '~/utils/system/execute';

describe('utils/system/exec', () => {
    it('should', async () => {
        expect.hasAssertions();

        const result = await execute('echo data');
        expect(isError(result)).toBeFalse();

        if (isError(result)) throw new Error();
        expect(result).toMatch(/^data$/m);
    });

    it('should not', async () => {
        expect.hasAssertions();

        const result = await execute('not_a_command');
        expect(isError(result)).toBeTrue();
    });
});
