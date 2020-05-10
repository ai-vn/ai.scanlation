/* eslint-disable @typescript-eslint/no-empty-function */
import { app, App } from 'electron';
import { appSession } from '~/app/helper/session';
import { env } from '~/__tests__/__utils__/utils.env';

const { save, load } = env('NODE_ENV', 'ELECTRON_SECURITY_CHECK');

describe('app/index', () => {
    beforeEach(() => {
        jest.resetModules();
        save();
    });
    afterEach(load);

    beforeAll(async () => {
        let sendToClient: null | Function = null;

        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(console, 'info').mockImplementation();
        jest.spyOn(console, 'error').mockImplementation();

        jest.mock('~/app/updater/updater', () => ({
            listenAutoUpdaterEvents: jest.fn(callback => {
                sendToClient = callback;
            }),
        }));

        jest.spyOn(app, 'on').mockImplementation(function listenerFn(
            this: App,
            event: string,
            listener,
        ) {
            if (['ready', 'activate', 'window-all-closed'].includes(event)) {
                listener();
                if (sendToClient !== null) sendToClient('');
            }
            return this;
        });
    });

    it.each([
        ['production', 'strict'],
        ['production', undefined],
        ['development', 'strict'],
        ['development', undefined],
    ])('should run app', async (NODE_ENV, ELECTRON_SECURITY_CHECK) => {
        expect.assertions(0);
        process.env.NODE_ENV = NODE_ENV;
        process.env.ELECTRON_SECURITY_CHECK = ELECTRON_SECURITY_CHECK;

        jest.spyOn(
            appSession.protocol,
            'interceptFileProtocol',
        ).mockImplementation((scheme, handler) => {
            if (scheme !== 'file') return;
            handler(
                {
                    url:
                        NODE_ENV === 'production'
                            ? 'file:///app/code/'
                            : 'https://localhost:3000',
                } as Electron.Request,
                () => {},
            );
        });

        await import('~/app');
    });
});
