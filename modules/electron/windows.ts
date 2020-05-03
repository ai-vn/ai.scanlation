import { remote, BrowserWindow } from 'electron';
import { ActionItem } from '~/modules/actions.type';

const wrap = (callback: (currentWindow: BrowserWindow) => () => void) => () =>
    callback(remote.getCurrentWindow())();

export const unmaximize: ActionItem = { call: wrap(c => c.unmaximize) };
export const minimize: ActionItem = { call: wrap(c => c.minimize) };
export const maximize: ActionItem = { call: wrap(c => c.maximize) };
export const close: ActionItem = { call: wrap(c => c.close), title: 'Exit' };
