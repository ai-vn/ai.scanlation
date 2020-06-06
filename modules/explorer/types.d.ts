import { Stats } from 'fs';
import { TableObject } from '~/components/explorer/table';

export interface FileSystemObject extends TableObject {
    index: number;
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
