import { shell } from 'electron';
import { statSync } from 'fs';
import { attempt, isError } from 'lodash';
import { explorer } from '~/store';

export const openShortcut = (filePath: string) => {
    const path = attempt(() => {
        const shortcut = shell.readShortcutLink(filePath);
        return statSync(shortcut.target).isDirectory()
            ? shortcut.target
            : shortcut.cwd;
    });
    if (path !== undefined && !isError(path)) explorer.setFolderPath(path);
};
