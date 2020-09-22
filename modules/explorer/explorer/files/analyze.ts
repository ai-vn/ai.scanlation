import { stat } from 'fs';
import { join } from 'path';
import { isError } from 'lodash';
import { getFolderType } from './folder.extension';
import { FileExplorerObject } from '~/modules/explorer/types';
import { attemptPromisify, toExt } from '~/utils';

export const analyze = async (
    folderPath: string,
    file: string,
): Promise<FileExplorerObject | null> => {
    const path = join(folderPath, file);

    const data = await attemptPromisify(stat)(path);
    if (isError(data)) return null;

    const result: FileExplorerObject = {
        index: 0,
        selected: false,
        key: path,
        name: file,
        stat: data,
        path,
        ext: '',
        time: data.mtime,
        isFolder: true,
    };
    if (data.isDirectory()) {
        result.isFolder = true;
        result.ext = getFolderType(file);
    }
    if (data.isFile()) {
        result.isFolder = false;
        result.size = data.size;
        result.ext = toExt(file);
    }
    return result;
};
