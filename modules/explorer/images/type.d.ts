import { FileExplorerObject } from '~/modules/explorer/types';

export type AnalyzeImageResult = Required<
    Pick<FileExplorerObject, 'dimensions' | 'color'>
>;

export interface AnalyzeImage {
    sign: string;
    data: (fd: number, size: number) => Promise<AnalyzeImageResult>;
}
