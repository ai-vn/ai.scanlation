import { close, open } from 'fs';
import { promisify } from 'util';
import { isImage } from './image.extension';
import { jpg } from './src/jpg';
import { png } from './src/png';
import { psd } from './src/psd';
import { AnalyzeImage } from './type';
import { FileExplorerObject } from '~/modules/explorer/types';
import { queue } from '~/modules/queue';
import type Explorer from '~/store/explorer';
import { readBuffer } from '~/utils';

const imageTypes: AnalyzeImage[] = [png, psd, jpg];

export const analyzeImage = async (file: FileExplorerObject) => {
    if (!file.stat) throw new Error('File stat is undefined');

    const fd = await promisify(open)(file.path, 'r');
    const buffer = await readBuffer(fd, 0, 8);

    const data = await imageTypes
        .find(({ sign }) => buffer.toString('hex', 0, sign.length / 2) === sign)
        ?.data(fd, file.stat.size);

    await promisify(close)(fd);

    return data;
};

export const analyzeImages = async ({ files, updateFile }: Explorer) => {
    queue.clear();
    await queue.addAll(
        files
            .filter(file => isImage(file.ext))
            .map(file => async () =>
                updateFile({
                    file,
                    data: {
                        key: `${file.key}-analyzed`,
                        ...(await analyzeImage(file)),
                    },
                }),
            ),
    );
};
