import { remote } from 'electron';
import { isError } from 'lodash';
import { attemptAsync } from '~/utils';

export const openFolder = async (callback: (path: string) => void) => {
    const path = await attemptAsync(remote.dialog.showOpenDialog)({
        properties: ['openDirectory'],
    });
    if (isError(path)) return;

    const folderPath = path.filePaths[0];
    if (folderPath !== undefined) callback(folderPath);
};
