// https://www.w3.org/TR/PNG/#11IHDR

import { AnalyzeImage } from '../type';
import { readBuffer } from '~/utils';

const colorMap: Record<string, number | undefined> = {
    0: 8,
    2: 24,
    3: 8,
    4: 8,
    6: 24,
};

export const png: AnalyzeImage = {
    sign: '89504e470d0a1a0a',
    data: async fd => {
        const buffer = await readBuffer(fd, 0, 26);
        return {
            dimensions: {
                x: buffer.readUIntBE(16, 4),
                y: buffer.readUIntBE(20, 4),
            },
            color: `PNG-${colorMap[buffer.readUIntBE(25, 1)]}`,
        };
    },
};
