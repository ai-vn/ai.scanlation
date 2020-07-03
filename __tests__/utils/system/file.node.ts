describe('utils/system/file', () => {
    it('should read buffer', async () => {
        expect.hasAssertions();

        jest.mock('util', () => ({
            promisify: () => async () => ({
                buffer: Buffer.from('0000', 'hex'),
            }),
        }));

        const { readBuffer } = await import('~/utils/system/file');
        const buffer = await readBuffer(0, 0, 4);

        expect(buffer).toStrictEqual(Buffer.from('0000', 'hex'));
    });
});
