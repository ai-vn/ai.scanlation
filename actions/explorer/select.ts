import { ActionItem } from '~/actions/actions.type';
import { isExplorer } from '~/actions/conditions';
import { explorer } from '~/store';

export const toggleAll: ActionItem = {
    call() {
        const { files, folders } = explorer;
        if (files.length === 0) return;

        const isSelectedAll = !explorer.files.some(f => f.selected === false);
        explorer.setData({
            files: files.map(file => ({ ...file, selected: !isSelectedAll })),
            folders,
        });
    },
    condition: isExplorer,
    title: 'Select All',
    accelerator: 'ctrl+a',
};
