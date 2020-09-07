import { TableField } from '~/components/table/table';
import { FileSystemObject } from '~/modules/explorer/types';

const file: FileSystemObject = {
    index: 0,
    selected: false,
    key: 'key',
    path: '',
    name: '',
    ext: 'jpg',
    isFolder: false,
    size: 1000,
    dimensions: { x: 0, y: 0 },
    time: new Date(),
};

describe('modules/explorer/table', () => {
    beforeAll(() => {
        jest.mock('~/store', () => ({
            explorer: {
                setFolderPath: jest.fn(),
                toggleSelectedFile: jest.fn(),
            },
        }));
        jest.mock('moment', () =>
            jest.fn().mockReturnValue({
                fromNow: jest.fn().mockReturnValue('a few seconds ago'),
            }),
        );
        jest.mock('~/modules/explorer/file/shortcut', () => ({
            openShortcut: jest.fn(),
        }));
    });

    it('should be valid table fields', async () => {
        expect.hasAssertions();

        const { tableFields } = await import('~/modules/explorer');

        const getField = (key: string) =>
            tableFields.find(field => field.key === key);
        const fieldShow = (field?: TableField<FileSystemObject>) =>
            field?.show?.call(undefined, file, 1);
        const fieldValue = (field?: TableField<FileSystemObject>) =>
            field?.converter?.call(undefined, file, 1);

        const fieldName = getField('name');
        const fieldNameShow = fieldShow(fieldName);
        expect(fieldNameShow).toBeFalse();

        const fieldSize = getField('size');
        const fieldSizeValue = fieldValue(fieldSize);
        expect(fieldSizeValue).toStrictEqual('1 KB');

        const fieldSizeShow = fieldShow(fieldSize);
        expect(fieldSizeShow).toBeTrue();

        const fieldDimensions = getField('dimensions');
        const fieldDimensionsValue = fieldValue(fieldDimensions);
        expect(fieldDimensionsValue).toStrictEqual('0 🞩 0');

        const fieldTime = getField('time');
        const fieldTimeValue = fieldValue(fieldTime);
        expect(fieldTimeValue).toStrictEqual('a few seconds ago');

        expect(tableFields).toBeArray();
    });

    it('should be valid table options', async () => {
        expect.hasAssertions();

        const { tableOptions } = await import('~/modules/explorer');

        const folder: FileSystemObject = { ...file, isFolder: true };
        tableOptions.rowClick?.call(folder, folder, {} as MouseEvent);
        tableOptions.rowDblclick?.call(folder, folder, {} as MouseEvent);

        tableOptions.rowClick?.call(file, file, {} as MouseEvent);
        tableOptions.rowDblclick?.call(file, file, {} as MouseEvent);

        const shortcut = { ...file, ext: 'lnk' };
        tableOptions.rowDblclick?.call(shortcut, shortcut, {} as MouseEvent);

        const rowClass = tableOptions.rowClass?.call(file, file);
        expect(rowClass).toStrictEqual({ selected: false });

        expect(tableOptions).toBeDefined();
    });
});
