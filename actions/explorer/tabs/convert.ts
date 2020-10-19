import { ActionItem } from '~/actions/actions.type';
import { isExplorer } from '~/actions/conditions';
import { openFolder } from '~/actions/utils';
import { explorer } from '~/store';

export const selectTargetFolderPath: ActionItem = {
    call: () => openFolder(explorer.setConvertTargetFolderPath),
    condition: isExplorer,
    title: 'Target folder',
    icon: 'folder',
};
