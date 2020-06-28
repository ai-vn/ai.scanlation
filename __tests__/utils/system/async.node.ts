import { exec } from 'child_process';
import { isError } from 'lodash';
import { attemptPromisify } from '~/utils/system/async'; // Don't import from root

describe('utils/system/async', () => {
    it('should echo', async () => {
        expect.hasAssertions();

        const result = await attemptPromisify(exec)('echo data');
        expect(isError(result)).toBeFalse();

        if (isError(result)) throw new Error();
        expect(result.stdout).toMatch(/^data$/m);
    });

    it("shouldn't echo", async () => {
        expect.hasAssertions();

        const result = await attemptPromisify(exec)('not_a_command');
        expect(isError(result)).toBeTrue();
    });
});
