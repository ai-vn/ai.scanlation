/* eslint-disable @typescript-eslint/no-empty-function */
import { ActionItem } from '~/actions/actions.type';
import { isExplorer } from '~/actions/conditions';

export const createRedrawFolder: ActionItem = {
    call() {},
    condition: isExplorer,
    title: 'Create redraw folder',
    icon: 'brush',
};

export const moveToRedrawFolder: ActionItem = {
    call() {},
    condition: isExplorer,
    title: 'Move to redraw folder',
    icon: 'arrow-up-right',
};

export const toggleFilesAsRedraw: ActionItem = {
    call() {},
    condition: isExplorer,
    title: 'Toggle files as redraw',
    icon: 'brush-2',
};
