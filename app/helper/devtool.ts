import { BrowserWindow } from 'electron';
import installer, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import devtron from 'devtron';

export async function installDevtool(window: BrowserWindow) {
    window.webContents.openDevTools();
    window.webContents.on('devtools-opened', () =>
        setImmediate(() => window.focus()),
    );

    await installer(VUEJS_DEVTOOLS);
    devtron.install();
}
