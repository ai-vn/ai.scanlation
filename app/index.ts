/* eslint-disable no-console */
/* eslint-disable no-process-exit */
import { app, BrowserWindow, session } from 'electron';
import { join, normalize } from 'path';
import { format } from 'url';
import { autoUpdater } from 'electron-updater';
import { disableSecurity, isDev, isSecurityCheck } from './env';
import { allowCertificate } from './helper/certificate';
import { listenAutoUpdaterEvents } from './updater/updater';

if (!isSecurityCheck) disableSecurity();

let window: BrowserWindow | null = null;

const fileProtocol = 'file';
const partition = 'ai-scanlation:partition';

function sendToClient(channel: string, ...args: any[]) {
    if (window) window.webContents.send(channel, ...args);
    else console.error(`Send Message Failed: `, channel, ...args);
}

async function createWindow() {
    if (window !== null) return;

    window = new BrowserWindow({
        frame: false,
        minWidth: 400,
        minHeight: 400,
        backgroundColor: '#FF000000',
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            partition,
        },
    });

    window.loadURL(
        isDev
            ? `https://localhost:${process.env.PORT}/`
            : format({
                  pathname: `/app/index.html`,
                  protocol: `${fileProtocol}:`,
                  slashes: true,
              }),
    );
    window.on('closed', () => (window = null));

    session
        .fromPartition(partition)
        .protocol.interceptFileProtocol(fileProtocol, (request, callback) => {
            let filePath = request.url
                .substr(fileProtocol.length + 3)
                .replace(/#(\\|\/)[^#]*$/, '');

            const startWithApp = /^(\/|\\)app(\/|\\)/;
            filePath = startWithApp.test(filePath)
                ? join(__dirname, filePath.replace(startWithApp, ''))
                : decodeURIComponent(filePath);

            callback(normalize(filePath));
        });

    if (isDev) {
        (await import('./helper/devtool')).installDevtool(window);
        await allowCertificate();
    }
}

listenAutoUpdaterEvents(sendToClient);

app.allowRendererProcessReuse = false;
app.on('ready', async () => {
    await createWindow();
    autoUpdater.checkForUpdatesAndNotify();
});
app.on('activate', createWindow);
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());
