import { remote } from 'electron';
import { actions } from '~/actions/actions.import';

describe('actions/electron/**', () => {
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
        it('should not throw error', () => {
            expect.hasAssertions();
            expect(actions.unmaximize.call).not.toThrow();
            expect(actions.minimize.call).not.toThrow();
            expect(actions.maximize.call).not.toThrow();
            expect(actions.close.call).not.toThrow();
        });
    });

    describe('dev', () => {
        it('should not throw error', () => {
            expect.hasAssertions();
            expect(actions.toggleDevTools.call).not.toThrow();
        });
    });
});
