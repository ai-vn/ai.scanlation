export interface FileReaderObject {
    index: number;

    name: string;
    path: string;
    ext: string;

    size: number;
    scroll: {
        top: number;
        bottom: number;
    };
}
