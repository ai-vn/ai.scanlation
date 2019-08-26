import { app, BrowserWindow } from 'electron';
import { isSecurityCheck, isDev } from './env';
import { disableSecurity } from './helper/checkSecurity';
import { getServer } from './helper/createServer';
import { installDevtool } from './helper/installDevtool';
import { allowCertificate } from './helper/certificate/listenCertificate';

if (!isSecurityCheck) disableSecurity();

let main: BrowserWindow | null = null;

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

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());
app.on('activate', () => main === null && (main = createWindow()));
app.on('ready', () => (main = createWindow()));
