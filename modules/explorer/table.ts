import { shell } from 'electron';
import moment from 'moment';
import { FileSystemObject } from './types.d';
import { nonNull, toSize } from '~/utils';
import { TableFields, TableOptions } from '~/components/table/table';
import { explorer } from '~/store';

export const tableFields: TableFields<FileSystemObject> = [
    {
        key: 'index',
        label: '#',
        class: 'text-center',
    },
    {
        key: 'name',
        label: 'Name',
        class: 'text-left',
        show: () => false,
    },
    {
        key: 'size',
        label: 'Size',
        tdClass: 'text-right',
        converter: nonNull(
            item => item.size,
            size => toSize(size),
        ),
        show: item => !item.isFolder,
    },
    {
        key: 'dimensions',
        label: 'Dimensions',
        tdClass: 'text-center',
        converter: nonNull(
            item => item.dimensions,
            dimensions => `${dimensions.x} 🞩 ${dimensions.y}`,
        ),
    },
    {
        key: 'color',
        label: 'Color',
    },
    {
        key: 'time',
        label: 'Time',
        converter: nonNull(
            item => item.time,
            time => moment(time).fromNow(),
        ),
    },
];

export const tableOptions: TableOptions<FileSystemObject> = {
    rowClick(item) {
        if (item.isFolder) explorer.setFolderPath(item.path);
    },

    rowDblclick(item) {
        if (!item.isFolder) shell.openPath(item.path);
    },
};
