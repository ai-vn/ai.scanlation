import { stat } from 'fs';
import { join } from 'path';
import { isError } from 'lodash';
import { FileReaderObject } from '~/modules/reader/types';
import { attemptPromisify, toExt } from '~/utils';

export const analyze = async (
    folderPath: string,
    file: string,
): Promise<FileReaderObject | null> => {
    const path = join(folderPath, file);

    const data = await attemptPromisify(stat)(path);
    if (isError(data) || data.isDirectory()) return null;

    return {
        index: 0,
        name: file,
        path,
        scroll: { top: 0, bottom: 0 },
        ext: toExt(file),
        size: data.size,
    };
};
