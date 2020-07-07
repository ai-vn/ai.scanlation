describe('modules/explorer/analyze/images/src/png', () => {
    it('should be png', async () => {
        expect.hasAssertions();

        jest.mock('~/utils', () => ({
            readBuffer: async () => {
                const buffer = Buffer.alloc(26);
                buffer.write('89504e470d0a1a0a', 'hex');

                return buffer;
            },
        }));

        const { png } = await import(
            '~/modules/explorer/analyze/images/src/png'
        );

        expect(await png.data(0, 0)).toStrictEqual({
            color: 'PNG-8',
            dimensions: { x: 0, y: 0 },
        });
    });
});
