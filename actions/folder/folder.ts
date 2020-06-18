import { remote } from 'electron';
import { dirname } from 'path';
import { isError } from 'lodash';
import { ActionItem } from '~/actions/actions.type';
import { explorer } from '~/store';
import { attemptAsync } from '~/utils';

export const selectFolder: ActionItem = {
    async call() {
        const path = await attemptAsync(remote.dialog.showOpenDialog)({
            properties: ['openDirectory'],
        });
        if (isError(path)) return;

        const folderPath = path.filePaths[0];
        if (folderPath !== undefined) explorer.setFolderPath(folderPath);
    },
    title: 'Open Folder',
    accelerator: 'ctrl+o',
};

export const goToParentFolder: ActionItem = {
    call() {
        if (explorer.folderPath === '') return;

        const parentFolderPath = dirname(explorer.folderPath);

        const isRoot = /^\w:(\\|\/)$/i.test(explorer.folderPath);
        explorer.setFolderPath(isRoot ? '' : parentFolderPath);
    },
    accelerator: 'backspace',
};
