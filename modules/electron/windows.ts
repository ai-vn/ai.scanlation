import { remote } from 'electron';
import { Action } from '~/modules/utils.type';

const currentWindow = remote.getCurrentWindow();

export const unmaximize: Action = { call: currentWindow.unmaximize };
export const minimize: Action = { call: currentWindow.minimize };
export const maximize: Action = { call: currentWindow.maximize };
export const close: Action = { call: currentWindow.close };
