import { remote } from 'electron';
import { ActionItem } from '~/modules/actions.type';

const currentWindow = remote.getCurrentWindow();
const wrap = (fn: () => void) => () => fn();

export const unmaximize: ActionItem = { call: wrap(currentWindow.unmaximize) };
export const minimize: ActionItem = { call: wrap(currentWindow.minimize) };
export const maximize: ActionItem = { call: wrap(currentWindow.maximize) };
export const close: ActionItem = {
    call: wrap(currentWindow.close),
    title: 'Exit',
};
