import { readFile } from 'fs';
import { promisify } from 'util';
import { isImage } from './image.extension';
import { jpg } from './src/jpg';
import { png } from './src/png';
import { psd } from './src/psd';
import { AnalyzeImage } from './type';
import { queue } from '~/modules/queue';
import { FileSystemObject } from '~/modules/explorer/types';

const imageTypes: AnalyzeImage[] = [png, psd, jpg];

export const analyzeImage = async (file: FileSystemObject) => {
    const buffer = await promisify(readFile)(file.path);

    return imageTypes.find(type => type.match(buffer))?.data(buffer);
};

export const analyzeImages = async (
    files: FileSystemObject[],
    updateFile: (file: Partial<FileSystemObject>) => void,
) => {
    queue.clear();
    await queue.addAll(
        files
            .filter(file => isImage(file.ext))
            .map(file => async () =>
                updateFile({
                    path: file.path,
                    key: `${file.key}-analyzed`,
                    ...(await analyzeImage(file)),
                }),
            ),
    );
};
