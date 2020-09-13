/* eslint-disable import/no-cycle */
// Electron
import * as dev from './electron/dev';
import * as windows from './electron/windows';
// Explorer
import * as explorer from './explorer';
// Help
import * as about from './help/about';
import * as open from './help/open';
import * as update from './help/update';
// Routers
import * as routers from './routers';
// Settings
import * as shortcuts from './settings/shortcut';

export const actions = {
    electron: {
        dev,
        windows,
    },
    explorer,
    help: {
        about,
        update,
        open,
    },
    routers,
    settings: {
        shortcuts,
    },
};
