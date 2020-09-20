import { mock } from '~/__tests__/__utils__';

describe('modules/explorer/images/src/psd', () => {
    it('should be psd', async () => {
        expect.hasAssertions();

        mock.utils({
            readBuffer: async () => {
                const buffer = Buffer.alloc(26);
                buffer.write('38425053', 'hex');

                return buffer;
            },
        });

        const { psd } = await import('~/modules/explorer/images/src/psd');

        expect(await psd.data(0, 0)).toStrictEqual({
            color: 'PSD-24',
            dimensions: { x: 0, y: 0 },
        });
    });
});
