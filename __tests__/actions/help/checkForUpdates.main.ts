import { checkForUpdates } from '~/actions/help/checkForUpdates';

describe('actions/help/checkForUpdates', () => {
    beforeAll(() => {
        jest.spyOn(console, 'info').mockImplementation();
    });

    it('should check for updates', () => {
        expect.hasAssertions();
        checkForUpdates.call();

        // eslint-disable-next-line no-console
        expect(console.info).toHaveBeenCalledWith(
            'Skip checkForUpdatesAndNotify because application is not packed',
        );
    });
});
