// http://vip.sugovica.hu/Sardi/kepnezo/JPEG%20File%20Layout%20and%20Format.htm
// https://github.com/image-size/image-size/blob/master/lib/types/jpg.ts
/* eslint-disable no-param-reassign */

import { AnalyzeImage } from '../type';

function findSOFBlock(buffer: Buffer) {
    buffer = buffer.slice(2);

    while (buffer.length) {
        if (buffer[0] !== 0xff) return null;
        if ([0xc0, 0xc1, 0xc2].includes(buffer[1])) return buffer;
        buffer = buffer.slice(buffer.readUIntBE(2, 2) + 2);
    }
    return null;
}

const colorMap: Record<string, number | undefined> = {
    1: 8,
    3: 24,
    4: 24,
};

export const jpg: AnalyzeImage = {
    match: buffer => buffer.toString('hex', 0, 2) === 'ffd8',
    data: buffer => {
        const SOFBlock = findSOFBlock(buffer);
        return !SOFBlock
            ? {
                  dimensions: { x: 0, y: 0 },
                  color: 'File Error',
              }
            : {
                  dimensions: {
                      x: SOFBlock.readUIntBE(5, 2),
                      y: SOFBlock.readUIntBE(7, 2),
                  },
                  color: `JPEG-${colorMap[SOFBlock.readUIntBE(9, 1)]}`,
              };
    },
};
