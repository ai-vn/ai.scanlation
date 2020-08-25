/* eslint-disable import/no-cycle */
import * as dev from './electron/dev';
import * as windows from './electron/windows';
import * as item from './explorer/item';
import * as select from './explorer/select';
import * as folder from './folder/folder';
import * as helpAbout from './help/about';
import * as checkForUpdates from './help/checkForUpdates';
import * as openExternal from './help/openExternal';
import * as routers from './pages/routers';
import * as shortcuts from './shortcut/reset';

export const actions = {
    ...checkForUpdates,
    ...dev,
    ...folder,
    ...helpAbout,
    ...item,
    ...openExternal,
    ...routers,
    ...select,
    ...shortcuts,
    ...windows,
};
