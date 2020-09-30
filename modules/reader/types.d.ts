import { FileObject } from '~/modules/data/type';

export interface FileReaderObject extends FileObject {
    index: number;

    size: number;
    scroll: {
        top: number;
        bottom: number;
    };
}
