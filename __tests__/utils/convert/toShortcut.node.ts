import { toShortcut } from '~/utils/converts/toShortcut';

describe('utils/convert/toShortcut', () => {
    it('should convert size to string', async () => {
        expect.hasAssertions();

        expect(toShortcut('alt')).toStrictEqual(
            '<span class="capitalize">(alt)</span>',
        );
        expect(toShortcut(undefined)).toBeUndefined();
    });
});
