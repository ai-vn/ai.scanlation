import { png } from '~/modules/explorer/analyze/images/src/png';

describe('modules/explorer/analyze/images/src/png', () => {
    it('should be png', () => {
        expect.hasAssertions();

        const buffer = Buffer.alloc(64);
        buffer.write('89504e470d0a1a0a', 'hex');

        expect(png.match(buffer)).toBeTrue();
        expect(png.data(buffer)).toStrictEqual({
            color: 'PNG-8',
            dimensions: { x: 0, y: 0 },
        });
    });
});
