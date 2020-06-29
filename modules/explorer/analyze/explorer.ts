/* eslint-disable no-param-reassign */
import { readdir } from 'fs';
import { parse } from 'path';
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
