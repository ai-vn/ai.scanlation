/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable node/no-unpublished-require */
import { BrowserWindow } from 'electron';

export function installDevtool(window: BrowserWindow) {
    window.webContents.openDevTools();
    window.webContents.on('devtools-opened', () =>
        setImmediate(() => window.focus()),
    );

    const installer = require('electron-devtools-installer');
    installer
        .default(installer.VUEJS_DEVTOOLS)
        .then((name: string) => console.log(`Added Extension: ${name}`))
        .catch((err: any) =>
            console.log('Unable to install `vue-devtools`: \n', err),
        );
    require('devtron').install();
}
