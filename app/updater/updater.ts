import { autoUpdater } from 'electron-updater';

export function listenAutoUpdaterEvents(
    sendToClient: (channel: string, ...args: any[]) => void,
) {
    const send: typeof sendToClient = (title, ...args) =>
        sendToClient('updater', title, ...args);

    autoUpdater.on('checking-for-update', () => send('checking'));
    autoUpdater.on('update-available', info => send('available', info));
    autoUpdater.on('update-not-available', info => send('not-available', info));
    autoUpdater.on('error', error => send('error', error));
    autoUpdater.on('download-progress', info => send('progress', info));
    autoUpdater.on('update-downloaded', info => send('downloaded', info));
}
