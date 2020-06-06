import { FileSystemObject } from '~/modules/explorer/types';

export type AnalyzeImageResult = Required<
    Pick<FileSystemObject, 'dimensions' | 'color'>
>;

export interface AnalyzeImage {
    name: string;
    match: (buffer: Buffer) => boolean;
    data: (buffer: Buffer) => AnalyzeImageResult;
}
