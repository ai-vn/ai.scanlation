import { BrowserWindow, WebContents } from 'electron';
import { installDevtool } from '~/app/helper/devtool';

describe('app/helper/devtool', () => {
    const window = new BrowserWindow({ show: false });

    beforeAll(() => {
        jest.spyOn(window.webContents, 'openDevTools').mockImplementation();
        jest.spyOn(window.webContents, 'on').mockImplementation(
            function listenerFn(this: WebContents, event, listener) {
                listener({} as any, {} as any);
                return this;
            },
        );
        jest.spyOn(global, 'setImmediate').mockImplementation(callback => {
            callback();
            return {} as NodeJS.Immediate;
        });
        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(console, 'error').mockImplementation();
    });

    it('should install devtool', async () => {
        expect.assertions(0);
        await installDevtool(window);
    });
});
