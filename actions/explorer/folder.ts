import { dirname } from 'path';
import { ActionItem } from '~/actions/actions.type';
import { isExplorer } from '~/actions/conditions';
import { openFolder } from '~/actions/utils';
import { explorer } from '~/store';

export const selectFolderPath: ActionItem = {
    call: () => openFolder(explorer.setFolderPath),
    condition: isExplorer,
    title: 'Open Folder',
    icon: 'folder',
    accelerator: 'ctrl+o',
};

export const goToParent: ActionItem = {
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

export const reload: ActionItem = {
    call() {
        explorer.watchFolderPath({ value: explorer.folderPath, oldValue: '~' });
    },
    condition: isExplorer,
    title: 'Reload',
    icon: 'rotate-ccw',
    accelerator: 'f5',
};
