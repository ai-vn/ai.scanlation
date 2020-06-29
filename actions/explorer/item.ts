import { shell } from 'electron';
import { existsSync } from 'fs';
import { isExplorer } from '~/actions/conditions';
import { ActionItem } from '~/actions/actions.type';
import { explorer } from '~/store';
import { isImage } from '~/modules/explorer/analyze/images/image.extension';
import { execute } from '~/utils';

export const showFolder: ActionItem = {
    call() {
        if (!existsSync(explorer.folderPath)) return;
        shell.showItemInFolder(explorer.folderPath);
    },
    condition: isExplorer,
    title: 'Show folder',
    accelerator: 'ctrl+e',
};

export const openInPhotoshop: ActionItem = {
    call() {
        const image = explorer.files.find(
            file => file.selected && isImage(file.ext),
        );
        if (image) execute(`start photoshop ${image.path}`);
    },
    condition: isExplorer,
    title: 'Open In Photoshop',
    accelerator: 'ctrl+p',
};
