import { jpg } from '~/modules/explorer/analyze/images/src/jpg';

describe('modules/explorer/analyze/images/src/jpg', () => {
    it('should be invalid jpg (not enough length)', () => {
        expect.hasAssertions();

        const buffer = Buffer.from('ffd8', 'hex');

        expect(jpg.match(buffer)).toBeTrue();
        expect(jpg.data(buffer)).toStrictEqual({
            color: 'File Error',
            dimensions: { x: 0, y: 0 },
        });
    });

    it('should be invalid jpg (block not start with 0xff)', () => {
        expect.hasAssertions();

        const buffer = Buffer.from('ffd80000', 'hex');

        expect(jpg.match(buffer)).toBeTrue();
        expect(jpg.data(buffer)).toStrictEqual({
            color: 'File Error',
            dimensions: { x: 0, y: 0 },
        });
    });

    it('should be valid jpg', () => {
        expect.hasAssertions();

        const buffer = Buffer.alloc(16);
        buffer.write('ffd8ffff0002ffc0', 'hex');

        expect(jpg.match(buffer)).toBeTrue();
        expect(jpg.data(buffer)).toStrictEqual({
            color: 'JPEG-undefined',
            dimensions: { x: 0, y: 0 },
        });
    });
});
