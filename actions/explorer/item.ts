import { shell } from 'electron';
import { existsSync } from 'fs';
import { ActionItem } from '~/actions/actions.type';
import { isExplorer } from '~/actions/conditions';
import { isImage } from '~/modules/explorer/images/image.extension';
import { explorer } from '~/store';
import { execute } from '~/utils';

export const revealInFileExplorer: ActionItem = {
    call() {
        if (!existsSync(explorer.folderPath)) return;
        shell.showItemInFolder(explorer.folderPath);
    },
    condition: isExplorer,
    title: 'Reveal in File Explorer',
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
