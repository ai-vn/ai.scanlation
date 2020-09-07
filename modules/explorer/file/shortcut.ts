import { shell } from 'electron';
import { statSync } from 'fs';
import { attempt, isError } from 'lodash';
import { explorer } from '~/store';

export const openShortcut = (filePath: string) => {
    const error = attempt(() => {
        const { target } = shell.readShortcutLink(filePath);

        if (statSync(target).isDirectory()) explorer.setFolderPath(target);
        else shell.openPath(target);
    });

    if (isError(error)) console.error(error.message);
};
