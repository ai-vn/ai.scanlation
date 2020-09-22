import { ActionItem } from '~/actions/actions.type';
import { isReader } from '~/actions/conditions';
import { reader } from '~/store';

export const toggleShowList: ActionItem = {
    call: () => reader.toggleShowList(),
    condition: isReader,
    title: 'Toggle Sidebar',
    icon: 'sidebar',
    accelerator: 'alt+t',
};
