describe('modules/explorer/analyze/images/src/jpg', () => {
    const getJpg = async (buffer: Buffer) => {
        jest.resetModules();
        jest.resetAllMocks();
        jest.doMock('~/utils', () => ({
            readBuffer: async () => buffer,
        }));
        const { jpg } = await import(
            '~/modules/explorer/analyze/images/src/jpg'
        );
        return jpg;
    };

    it('should be invalid jpg (not enough length)', async () => {
        expect.hasAssertions();

        const jpg = await getJpg(Buffer.from('ffd85555', 'hex'));
        expect(await jpg.data(0, 4)).toStrictEqual({
            color: 'File Error',
            dimensions: { x: 0, y: 0 },
        });
    });

    it('should be invalid jpg (block not start with 0xff)', async () => {
        expect.hasAssertions();

        const jpg = await getJpg(Buffer.from('9900', 'hex'));
        expect(await jpg.data(0, 4)).toStrictEqual({
            color: 'File Error',
            dimensions: { x: 0, y: 0 },
        });
    });

    it('should be valid jpg', async () => {
        expect.hasAssertions();

        const jpg = await getJpg(Buffer.from('ffc00000001000100001', 'hex'));
        expect(await jpg.data(0, 4)).toStrictEqual({
            color: 'JPEG-8',
            dimensions: { x: 4096, y: 4096 },
        });
    });
});
