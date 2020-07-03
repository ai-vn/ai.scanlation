// http://vip.sugovica.hu/Sardi/kepnezo/JPEG%20File%20Layout%20and%20Format.htm
// https://github.com/image-size/image-size/blob/master/lib/types/jpg.ts
/* eslint-disable no-await-in-loop */

import { AnalyzeImage } from '../type';
import { readBuffer } from '~/utils';

async function findSOFBlock(fd: number, size: number) {
    let offset = 2;
    let buffer: Buffer;

    while (offset <= size) {
        buffer = await readBuffer(fd, offset, 10);
        if (buffer[0] !== 0xff) return null;
        if ([0xc0, 0xc1, 0xc2].includes(buffer[1])) return buffer;
        offset += buffer.readUIntBE(2, 2) + 2;
    }
    return null;
}

const colorMap: Record<string, number | undefined> = {
    1: 8,
    3: 24,
    4: 24,
};

export const jpg: AnalyzeImage = {
    sign: 'ffd8',
    data: async (fd, size) => {
        const SOFBlock = await findSOFBlock(fd, size);
        return !SOFBlock
            ? {
                  dimensions: { x: 0, y: 0 },
                  color: 'File Error',
              }
            : {
                  dimensions: {
                      x: SOFBlock.readUIntBE(7, 2),
                      y: SOFBlock.readUIntBE(5, 2),
                  },
                  color: `JPEG-${colorMap[SOFBlock.readUIntBE(9, 1)]}`,
              };
    },
};
