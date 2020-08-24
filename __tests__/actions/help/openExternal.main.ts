describe('actions/help/openExternal', () => {
    beforeAll(() => {
        jest.mock('electron', () => ({
            shell: {
                openExternal: jest.fn(),
            },
        }));
    });

    it('should check for updates', async () => {
        expect.assertions(0);

        const { openFacebook } = await import('~/actions/help/openExternal');
        openFacebook.call();
    });
});
