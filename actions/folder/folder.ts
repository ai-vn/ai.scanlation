import { remote } from 'electron';
import { dirname } from 'path';
import { ActionItem } from '~/actions/actions.type';
import { explorer } from '~/store';

export const selectFolder: ActionItem = {
    async call() {
        const path = await remote.dialog.showOpenDialog({
            properties: ['openDirectory'],
        });
        const folderPath = path.filePaths[0];
        if (folderPath !== undefined) explorer.setFolderPath(folderPath);
    },
    title: 'Open Folder',
    accelerator: 'ctrl+o',
};

export const goToParentFolder: ActionItem = {
    async call() {
        if (explorer.folderPath === '') return;

        const parentFolderPath = dirname(explorer.folderPath);
        if (/^\w:(\\|\/)$/i.test(explorer.folderPath))
            explorer.setFolderPath('.');
        else explorer.setFolderPath(parentFolderPath);
    },
    accelerator: 'backspace',
};
