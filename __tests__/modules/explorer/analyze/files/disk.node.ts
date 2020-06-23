describe('modules/explorer/analyze/files/disks', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('should return disks', async () => {
        expect.hasAssertions();

        jest.mock('~/utils', () => ({
            execute: jest
                .fn()
                .mockReturnValue(
                    [
                        'DeviceID  VolumeName',
                        'C:        Windows',
                        'D:        Anime - Manga',
                        'E:        DATA',
                    ].join('\n'),
                ),
        }));

        const { disks } = await import(
            '~/modules/explorer/analyze/files/disks'
        );
        await disks();
        const results = await disks();
        expect(results).toBeArrayOfSize(3);
    });

    it('should return error', async () => {
        expect.hasAssertions();

        jest.mock('~/utils', () => ({
            execute: jest.fn().mockReturnValue(new Error()),
        }));

        const { disks } = await import(
            '~/modules/explorer/analyze/files/disks'
        );
        const results = await disks();
        expect(results).toBeArrayOfSize(0);
    });
});
