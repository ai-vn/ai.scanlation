import { remote } from 'electron';
import { ActionItem } from '~/modules/actions.type';

const currentWindow = remote.getCurrentWindow();

export const unmaximize: ActionItem = { call: currentWindow.unmaximize };
export const minimize: ActionItem = { call: currentWindow.minimize };
export const maximize: ActionItem = { call: currentWindow.maximize };
export const close: ActionItem = { call: currentWindow.close, title: 'Exit' };
