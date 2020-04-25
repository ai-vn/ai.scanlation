import { remote } from 'electron';
import { ActionItem } from '~/modules/actions.type';
import { explorer } from '~/store';

export const selectFolder: ActionItem = {
    async call() {
        const path = await remote.dialog.showOpenDialog({
            properties: ['openDirectory'],
        });
        const filePath = path.filePaths[0];
        if (filePath !== undefined) explorer.setFilePath(filePath);
    },
    title: 'Open Folder',
    accelerator: 'ctrl+o',
};
