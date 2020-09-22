import { readdir } from 'fs';
import { isError } from 'lodash';
import { analyze } from './analyze';
import { ignoreFilter } from '~/modules/ignore/ignore';
import { FileReaderObject } from '~/modules/reader/types';
import { attemptPromisify } from '~/utils';

export const reader = async (folderPath: string) => {
    if (folderPath === '') return { files: [] };

    const files: FileReaderObject[] = [];
    const fileOrFolders = await attemptPromisify(readdir)(folderPath);
    if (isError(fileOrFolders)) return undefined;

    const analyzeFiles = fileOrFolders
        .filter(ignoreFilter)
        .map(async fileOrFolder => {
            const result = await analyze(folderPath, fileOrFolder);
            const extensions = ['jpg', 'jpeg', 'png', 'psd'];
            if (!result || !extensions.includes(result.ext)) return;
            files.push(result);
        });
    await Promise.all(analyzeFiles);

    return { files };
};
