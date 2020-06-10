/* eslint-disable import/no-cycle */
import * as dev from './electron/dev';
import * as folder from './folder/folder';
import * as routers from './pages/routers';
import * as shortcuts from './shortcut/reset';
import * as windows from './electron/windows';

export const actions = {
    ...dev,
    ...folder,
    ...routers,
    ...shortcuts,
    ...windows,
};
