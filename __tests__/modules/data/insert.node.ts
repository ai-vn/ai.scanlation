import { insert } from '~/modules/data';
import { FileObject } from '~/modules/data/type';

describe('modules/data/insert', () => {
    const file = (name: string): FileObject => ({
        name,
        ext: '',
        path: '',
    });

    it('should insert items', () => {
        expect.hasAssertions();

        const files: FileObject[] = [];

        insert(files, file('item 2'));
        insert(files, file('item 11'));
        insert(files, file('item 1'));

        expect(files.map(f => f.name)).toStrictEqual([
            'item 1',
            'item 2',
            'item 11',
        ]);
    });
});
