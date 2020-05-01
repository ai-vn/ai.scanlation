import { remote } from 'electron';
import { actions } from '~/modules/actions.import';

describe('module: electron', () => {
    beforeAll(() => {
        const currentWindow = remote.getCurrentWindow();
        jest.spyOn(remote, 'getCurrentWindow').mockImplementation(() => {
            jest.spyOn(currentWindow, 'unmaximize').mockImplementation();
            jest.spyOn(currentWindow, 'minimize').mockImplementation();
            jest.spyOn(currentWindow, 'maximize').mockImplementation();
            jest.spyOn(currentWindow, 'close').mockImplementation();
            return Object.create(currentWindow);
        });
    });

    describe('windows', () => {
        it('should not throw error', async () => {
            expect.hasAssertions();
            expect(actions.unmaximize.call).not.toThrow();
            expect(actions.minimize.call).not.toThrow();
            expect(actions.maximize.call).not.toThrow();
            expect(actions.close.call).not.toThrow();
        });
    });

    describe('dev', () => {
        it('should not throw error', async () => {
            expect.hasAssertions();
            expect(actions.toggleDevTools.call).not.toThrow();
        });
    });
});
