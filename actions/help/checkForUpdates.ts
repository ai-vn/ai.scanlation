import { autoUpdater } from 'electron-updater';
import { ActionItem } from '~/actions/actions.type';

export const checkForUpdates: ActionItem = {
    call() {
        autoUpdater.checkForUpdatesAndNotify();
    },
    title: 'Check for Updates...',
    icon: 'download-cloud',
};
