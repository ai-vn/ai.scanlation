import { ActionItem } from '~/actions/actions.type';
import { isReader } from '~/actions/conditions';
import { openFolder } from '~/actions/utils';
import { reader } from '~/store';

export const open: ActionItem = {
    call: () => openFolder(reader.setFolderPath),
    condition: isReader,
    title: 'Open Folder',
    icon: 'folder',
    accelerator: 'ctrl+o',
};

export const reload: ActionItem = {
    call() {
        reader.watchFolderPath({ value: reader.folderPath, oldValue: '~' });
    },
    condition: isReader,
    title: 'Reload',
    icon: 'rotate-ccw',
    accelerator: 'f5',
};
