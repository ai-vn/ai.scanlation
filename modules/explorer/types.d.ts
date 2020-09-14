import { Stats } from 'fs';
import { TableObject } from '~/components/table/table';

export interface FileExplorerObject extends TableObject {
    index: number;
    selected: boolean;
    key: string;
    stat?: Stats;

    name: string;
    path: string;

    time?: Date;
    ext: string;

    size?: number;
    dimensions?: {
        x: number;
        y: number;
    };
    color?: string;

    isFolder: boolean;
}
