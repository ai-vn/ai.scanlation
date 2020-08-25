import { remote } from 'electron';
import { dirname } from 'path';
import { isError } from 'lodash';
import { ActionItem } from '~/actions/actions.type';
import { isExplorer } from '~/actions/conditions';
import { explorer } from '~/store';
import { attemptAsync } from '~/utils';

export const explorerSelectFolder: ActionItem = {
    async call() {
        const path = await attemptAsync(remote.dialog.showOpenDialog)({
            properties: ['openDirectory'],
        });
        if (isError(path)) return;

        const folderPath = path.filePaths[0];
        if (folderPath !== undefined) explorer.setFolderPath(folderPath);
    },
    condition: isExplorer,
    title: 'Open Folder',
    icon: 'folder',
    accelerator: 'ctrl+o',
};

export const explorerGoToParentFolder: ActionItem = {
    call() {
        if (explorer.folderPath === '') return;

        const parentFolderPath = dirname(explorer.folderPath);

        const isRoot = /^\w:(\\|\/)$/i.test(explorer.folderPath);
        explorer.setFolderPath(isRoot ? '' : parentFolderPath);
    },
    condition: isExplorer,
    title: 'Go to parent folder',
    icon: 'corner-right-up',
    accelerator: 'backspace',
};

export const explorerReload: ActionItem = {
    call() {
        explorer.watchFolderPath({ value: explorer.folderPath, oldValue: '~' });
    },
    condition: isExplorer,
    title: 'Reload',
    icon: 'rotate-ccw',
};
