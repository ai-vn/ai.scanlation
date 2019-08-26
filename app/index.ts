import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import { isSecurityCheck, isDev } from './env';
import { disableSecurity } from './helper/checkSecurity';
import { getServer } from './helper/createServer';
import { installDevtool } from './helper/installDevtool';
import { allowCertificate } from './helper/certificate/listenCertificate';
import { listenAutoUpdaterEvents } from './updater/updater';

if (!isSecurityCheck) disableSecurity();

let main: BrowserWindow | null = null;

function sendToClient(channel: string, ...args: any[]) {
    if (main) main.webContents.send(channel, ...args);
}

function createWindow() {
    const window = new BrowserWindow({
        webPreferences: { nodeIntegration: true },
    });

    (async () => {
        const { url, keys } = await getServer();

        window.loadURL(url);

        if (keys) allowCertificate(keys);
    })();

    window.on('closed', () => (main = null));

    if (isDev) installDevtool(window);

    return window;
}

listenAutoUpdaterEvents(sendToClient);
sendToClient('updater', 'RUN');

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());
app.on('activate', () => main === null && (main = createWindow()));
app.on('ready', () => {
    main = createWindow();
    autoUpdater.checkForUpdatesAndNotify();
});
