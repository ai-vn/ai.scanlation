import { extname } from 'path';
import { isImage } from '~/modules/explorer/images/image.extension';

const nameMapper = (name: string) =>
    extname(`_${name}`).replace(/^\./, '').toLocaleLowerCase();

describe('modules/explorer/images/images.extension', () => {
    it('should be images', () => {
        expect.hasAssertions();

        const result = ['a.png', 'b.jpg', 'c.jpeg', 'd.gif', 'e.psd']
            .map(nameMapper)
            .every(isImage);
        expect(result).toBeTrue();
    });

    it("shouldn't be image", () => {
        expect.hasAssertions();

        const result = ['a.doc', 'b.xls', 'c.txt', '.aiscans']
            .map(nameMapper)
            .some(isImage);
        expect(result).toBeFalse();
    });
});
