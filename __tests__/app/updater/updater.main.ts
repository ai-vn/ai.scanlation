import { AppUpdater, autoUpdater } from 'electron-updater';
import { listenAutoUpdaterEvents } from '~/app/updater/updater';

describe('app/updater/updater', () => {
    beforeAll(() => {
        jest.spyOn(autoUpdater, 'on').mockImplementation(function listenerFn(
            this: AppUpdater,
            event,
            listener,
        ) {
            listener(event);
            return this;
        });
    });

    it('should listen auto update events', () => {
        expect.hasAssertions();
        const events: string[] = [];
        listenAutoUpdaterEvents((channel, event) => {
            events.push(event);
        });
        expect(events).toStrictEqual([
            'checking',
            'available',
            'not-available',
            'error',
            'progress',
            'downloaded',
        ]);
    });
});
