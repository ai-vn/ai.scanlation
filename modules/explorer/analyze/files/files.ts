import { stat } from 'fs';
import { extname, join } from 'path';
import { isError } from 'lodash';
import { getFolderType } from '../utils/folder.extension';
import { FileSystemObject } from '~/modules/explorer/types';
import { attemptPromisify } from '~/utils';

export const analyze = async (
    folderPath: string,
    name: string,
): Promise<FileSystemObject | null> => {
    const path = join(folderPath, name);

    const data = await attemptPromisify(stat)(path);
    if (isError(data)) return null;

    const result: FileSystemObject = {
        index: 0,
        selected: false,
        key: path,
        name,
        stat: data,
        path,
        ext: '',
        time: data.mtime,
        isFolder: true,
    };
    if (data.isDirectory()) {
        result.isFolder = true;
        result.ext = getFolderType(name);
    }
    if (data.isFile()) {
        result.isFolder = false;
        result.size = data.size;
        result.ext = extname(`_${name}`).replace(/^\./, '').toLocaleLowerCase();
    }
    return result;
};
