/* eslint-disable no-console */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import http from 'http';
import path from 'path';
import { format } from 'url';
import { Builder, Nuxt } from 'nuxt';
import { app, BrowserWindow } from 'electron';
import config from '../nuxt.config';

const dev = process.env.NODE_ENV !== 'production';

function createServer() {
    const nuxt = new Nuxt({ ...config, dev });

    if (dev)
        new Builder(nuxt).build().catch(err => {
            console.error(err);
            // eslint-disable-next-line no-process-exit
            process.exit(1);
        });

    const address = http
        .createServer(nuxt.render)
        .listen()
        .address();

    if (address === null) throw new Error('Address is null');

    return typeof address !== 'string'
        ? `http://localhost:${address.port}`
        : address;
}

let main: BrowserWindow | null = null;

function createWindow() {
    const window = new BrowserWindow({
        webPreferences: { nodeIntegration: true },
    });

    const url = dev
        ? createServer()
        : format({
              pathname: path.join(__dirname, 'index.html'),
              protocol: 'file',
              slashes: true,
          });

    window.loadURL(url);
    window.on('closed', () => (main = null));

    // ?  Install `vue-devtools`
    if (process.env.NODE_ENV === 'development') {
        window.webContents.openDevTools();
        window.webContents.on('devtools-opened', () =>
            setImmediate(() => window.focus()),
        );

        const installExtension = require('electron-devtools-installer');
        installExtension
            .default(installExtension.VUEJS_DEVTOOLS)
            .then((name: string) => console.log(`Added Extension: ${name}`))
            .catch((err: any) =>
                console.log('Unable to install `vue-devtools`: \n', err),
            );
        require('devtron').install();
    }

    return window;
}

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());
app.on('activate', () => main === null && (main = createWindow()));
app.on('ready', () => (main = createWindow()));
