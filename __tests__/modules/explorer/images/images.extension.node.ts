import { isImage } from '~/modules/explorer/images/image.extension';
import { toExt } from '~/utils';

describe('modules/explorer/images/images.extension', () => {
    it('should be images', () => {
        expect.hasAssertions();

        const result = ['a.png', 'b.jpg', 'c.jpeg', 'd.gif', 'e.psd']
            .map(toExt)
            .every(isImage);
        expect(result).toBeTrue();
    });

    it("shouldn't be image", () => {
        expect.hasAssertions();

        const result = ['a.doc', 'b.xls', 'c.txt', '.aiscans']
            .map(toExt)
            .some(isImage);
        expect(result).toBeFalse();
    });
});
