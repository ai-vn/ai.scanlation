import { shell } from 'electron';
import moment from 'moment';
import { openShortcut } from './file/shortcut';
import { FileExplorerObject } from './types.d';
import { TableFields, TableOptions } from '~/components/table/table';
import { explorer } from '~/store';
import { nonNull, toSize } from '~/utils';

export const tableFields: TableFields<FileExplorerObject> = [
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

export const tableOptions: TableOptions<FileExplorerObject> = {
    rowClass: ({ selected }) => ({ selected }),

    rowClick(item) {
        if (item.isFolder) {
            explorer.setFolderPath(item.path);
        } else {
            explorer.toggleSelectedFile(item);
        }
    },

    rowDblclick(item) {
        if (!item.isFolder) {
            if (item.ext === 'lnk') openShortcut(item.path);
            else shell.openPath(item.path);
        }
    },
};
