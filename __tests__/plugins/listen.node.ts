import { IpcRenderer, IpcRendererEvent } from 'electron';

describe('plugins/listen', () => {
    beforeAll(() => {
        jest.spyOn(console, 'info').mockImplementation();
        jest.mock('electron', () => ({
            ipcRenderer: {
                on(
                    this: IpcRenderer,
                    channel: string,
                    listener: (event: IpcRendererEvent, ...args: any[]) => void,
                ) {
                    listener({} as IpcRendererEvent, channel);
                    return this;
                },
            },
        }));
    });

    it('should listen event', async () => {
        expect.hasAssertions();
        await import('~/plugins/listen');

        // eslint-disable-next-line no-console
        expect(console.info).toHaveBeenCalledWith({}, ['updater']);
    });
});
