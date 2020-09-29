/* eslint-disable no-param-reassign */
import { readdir } from 'fs';
import { isError } from 'lodash';
import { analyze } from './files/analyze';
import { disks } from './files/disks';
import { insert } from '~/modules/data';
import { FileExplorerObject } from '~/modules/explorer/types';
import { ignoreFilter } from '~/modules/ignore/ignore';
import { attemptPromisify } from '~/utils';

export const explorer = async (folderPath: string) => {
    if (folderPath === '') {
        return { files: [], folders: await disks() };
    }

    const fileOrFolders = await attemptPromisify(readdir)(folderPath);
    if (isError(fileOrFolders)) return undefined;

    const files: FileExplorerObject[] = [];
    const folders: FileExplorerObject[] = [];

    const analyzeFileOrFolders = fileOrFolders
        .filter(ignoreFilter)
        .map(async fileOrFolder => {
            const result = await analyze(folderPath, fileOrFolder);
            if (!result) return;

            insert(result.isFolder ? folders : files, result);
        });
    await Promise.all(analyzeFileOrFolders);

    folders.forEach((folder, index) => (folder.index = index));
    files.forEach((file, index) => (file.index = index + folders.length));

    return { files, folders };
};
