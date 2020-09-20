import { shell } from 'electron';
import fs, { Stats } from 'fs';
import lodash from 'lodash';
import { store } from '~/__tests__/__utils__';

describe('modules/explorer/actions/shortcut', () => {
    beforeAll(async () => {
        await store('explorer');
    });
    beforeEach(() => {
        jest.resetModules();
    });

    it("shouldn't open shortcut", async () => {
        expect.assertions(0);

        jest.spyOn(console, 'error').mockImplementation();
        jest.spyOn(lodash, 'attempt').mockImplementation(() => new Error());

        (await import('~/modules/explorer/actions/shortcut')).openShortcut('');
    });

    it.each([[true], [false]])('shortcut', async isDirectory => {
        expect.assertions(0);

        jest.spyOn(shell, 'readShortcutLink').mockImplementation(_ => ({
            target: 'directory',
        }));
        jest.spyOn(fs, 'statSync').mockImplementation(
            _ => ({ isDirectory: () => isDirectory } as Stats),
        );

        (await import('~/modules/explorer/actions/shortcut')).openShortcut('');
    });
});
