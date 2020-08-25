describe('assets/style/tailwind/variants', () => {
    it('should insert variants into each core plugin', async () => {
        expect.hasAssertions();

        const { variants } = await import('~/assets/style/tailwind/variants');

        variants({});
        const { animation } = variants({
            before: ['foo'],
            after: ['bar'],
        });

        expect(animation).toStrictEqual(['foo', 'responsive', 'bar']);
    });
});
