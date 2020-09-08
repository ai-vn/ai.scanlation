describe('plugins/listen', () => {
    beforeAll(() => {
        jest.spyOn(console, 'info').mockImplementation();
    });

    it('should listen event', async () => {
        expect.hasAssertions();
        await import('~/plugins/listen');

        // eslint-disable-next-line no-console
        expect(console.info).toHaveBeenCalledWith({}, ['updater']);
    });
});
