/* eslint-disable import/no-cycle */
import * as dev from './electron/dev';
import * as windows from './electron/windows';
import * as item from './explorer/item';
import * as select from './explorer/select';
import * as folder from './folder/folder';
import * as routers from './pages/routers';
import * as shortcuts from './shortcut/reset';

export const actions = {
    ...dev,
    ...folder,
    ...item,
    ...routers,
    ...select,
    ...shortcuts,
    ...windows,
};
