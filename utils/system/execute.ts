import { exec } from 'child_process';
import { isError } from 'lodash';
import { attemptPromisify } from './async';

export const execute = async (cmd: string) => {
    const results = await attemptPromisify(exec)(cmd);
    if (isError(results)) return results;

    return results.stdout;
};
