/* eslint-disable no-process-exit */
import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { format } from 'url';
import { autoUpdater } from 'electron-updater';
import { disableSecurity, isDev, isSecurityCheck } from './env';
import { allowCertificate } from './helper/certificate';
import { installDevtool } from './helper/installDevtool';
import { listenAutoUpdaterEvents } from './updater/updater';

if (!isSecurityCheck) disableSecurity();

let window: BrowserWindow | null = null;

function sendToClient(channel: string, ...args: any[]) {
    if (window) window.webContents.send(channel, ...args);
    else console.error(`Send Message Failed: `, channel, ...args);
}

function createWindow() {
    if (window !== null) return;

    window = new BrowserWindow({
        webPreferences: { nodeIntegration: true },
    });

    const url = isDev
        ? `https://localhost:${process.env.PORT}/`
        : format({
              pathname: join(__dirname, 'index.html'),
              protocol: 'file',
              slashes: true,
          });

    window.loadURL(url);
    window.on('closed', () => (window = null));

    if (isDev) {
        installDevtool(window);
        allowCertificate();
    }
}

listenAutoUpdaterEvents(sendToClient);

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());
app.on('activate', createWindow);
app.on('ready', () => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
});
