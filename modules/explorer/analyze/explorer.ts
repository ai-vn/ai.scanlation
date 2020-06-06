import { readdir } from 'fs';
import { isError } from 'lodash';
import { disks } from './files/disks';
import { analyze } from './files/files';
import { ignoreFilter } from './utils/ignore';
import { attemptPromisify } from '~/utils';
import { FileSystemObject } from '~/modules/explorer/types';

export const explorer = async (folderPath: string) => {
    if (folderPath === '') {
        return { files: [], folders: await disks() };
    }

    const fileOrFolders = await attemptPromisify(readdir)(folderPath);
    if (isError(fileOrFolders)) return undefined;

    const files: FileSystemObject[] = [];
    const folders: FileSystemObject[] = [];

    const analyzeFileOrFolders = fileOrFolders
        .filter(ignoreFilter)
        .map(async fileOrFolder => {
            const result = await analyze(folderPath, fileOrFolder);
            if (!result) return;
            (result.isFolder ? folders : files).push(result);
        });
    await Promise.all(analyzeFileOrFolders);

    return { files, folders };
};
