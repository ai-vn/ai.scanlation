import { psd } from '~/modules/explorer/analyze/images/src/psd';

describe('modules/explorer/analyze/images/src/psd', () => {
    it('should be psd', () => {
        expect.hasAssertions();

        const buffer = Buffer.alloc(64);
        buffer.write('38425053', 'hex');

        expect(psd.match(buffer)).toBeTrue();
        expect(psd.data(buffer)).toStrictEqual({
            color: 'PSD-24',
            dimensions: { x: 0, y: 0 },
        });
    });
});
