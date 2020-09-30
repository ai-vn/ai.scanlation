import { Stats } from 'fs';
import { TableObject } from '~/components/table/table';
import { FileObject } from '~/modules/data/type';

export interface FileExplorerObject extends TableObject, FileObject {
    index: number;
    selected: boolean;
    key: string;
    isFolder: boolean;
    stat?: Stats;

    time?: Date;

    size?: number;
    dimensions?: {
        x: number;
        y: number;
    };
    color?: string;
}
