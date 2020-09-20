/* eslint-disable no-param-reassign */
import { readdir } from 'fs';
import { parse } from 'path';
import { isError } from 'lodash';
import { analyze } from './files/analyze';
import { disks } from './files/disks';
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
            (result.isFolder ? folders : files).push(result);
        });
    await Promise.all(analyzeFileOrFolders);

    const { compare } = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base',
    });

    folders
        .sort((a, b) => compare(a.name, b.name))
        .forEach((folder, index) => (folder.index = index));
    const folderLength = folders.length;
    files
        .sort((a, b) => compare(parse(a.name).name, parse(b.name).name))
        .forEach((file, index) => (file.index = index + folderLength));

    return { files, folders };
};
