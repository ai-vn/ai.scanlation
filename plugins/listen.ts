import { ipcRenderer } from 'electron';

ipcRenderer.on('updater', (event: Event, ...args: any[]) => {
    // eslint-disable-next-line no-console
    console.info(event, args);
});
