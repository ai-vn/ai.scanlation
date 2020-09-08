import { remote } from 'electron';
import { ActionItem } from '~/actions/actions.type';

const win = remote.getCurrentWindow();

export const unmaximize: ActionItem = { call: () => win.unmaximize() };
export const minimize: ActionItem = { call: () => win.minimize() };
export const maximize: ActionItem = { call: () => win.maximize() };
export const close: ActionItem = {
    call: () => win.close(),
    title: 'Exit',
    icon: 'x',
};
