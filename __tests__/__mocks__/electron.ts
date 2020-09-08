import {
    BrowserWindow,
    IpcRenderer,
    IpcRendererEvent,
    Remote,
    Shell,
} from 'electron';
import { DeepPartial } from '~/types/type';

export const remote: DeepPartial<Remote> = {
    getCurrentWindow: () => ({
        unmaximize: jest.fn(),
        minimize: jest.fn(),
        maximize: jest.fn(),
        close: jest.fn(),
        webContents: {
            toggleDevTools: jest.fn(),
        },
        on: jest.fn(function on(
            this: BrowserWindow,
            event: string,
            listener: (event: Event, options: any) => void,
        ) {
            listener({} as Event, {});
            return this;
        }),
        isMaximized: jest.fn(() => true),
    }),
    dialog: {
        showOpenDialog: jest.fn(),
    },
};

export const shell: DeepPartial<Shell> = {
    showItemInFolder: jest.fn(),
    openExternal: jest.fn(),
    openPath: jest.fn(),
    readShortcutLink: jest.fn(() => ({
        target: '',
        cwd: '',
    })),
};

export const ipcRenderer: DeepPartial<IpcRenderer> = {
    on(
        this: IpcRenderer,
        channel: string,
        listener: (event: IpcRendererEvent, ...args: any[]) => void,
    ) {
        listener({} as IpcRendererEvent, channel);
        return this;
    },
};
