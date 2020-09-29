import { readdir } from 'fs';
import { isError } from 'lodash';
import { analyze } from './analyze';
import { insert } from '~/modules/data';
import { ignoreFilter } from '~/modules/ignore/ignore';
import { FileReaderObject } from '~/modules/reader/types';
import { attemptPromisify } from '~/utils';

const allowExtensions = ['jpg', 'jpeg', 'gif', 'png', 'psd'];

export const reader = async (folderPath: string) => {
    if (folderPath === '') return { files: [] };

    const files: FileReaderObject[] = [];
    const fileOrFolders = await attemptPromisify(readdir)(folderPath);
    if (isError(fileOrFolders)) return undefined;

    const analyzeFiles = fileOrFolders
        .filter(ignoreFilter)
        .map(async fileOrFolder => {
            const file = await analyze(folderPath, fileOrFolder);

            if (!file || !allowExtensions.includes(file.ext)) return;

            insert(files, file);
        });
    await Promise.all(analyzeFiles);

    return { files };
};
