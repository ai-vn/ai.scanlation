// Documents: https://www.w3.org/TR/PNG/#11IHDR

import { AnalyzeImage } from '../type';

const colorMap: Record<string, number | undefined> = {
    0: 8,
    2: 24,
    3: 8,
    4: 8,
    6: 24,
};

export const png: AnalyzeImage = {
    name: 'png',
    match: buffer => buffer.toString('hex', 0, 8) === '89504e470d0a1a0a',
    data: buffer => ({
        dimensions: {
            x: buffer.readUIntBE(16, 4),
            y: buffer.readUIntBE(20, 4),
        },
        color: `PNG-${colorMap[buffer.readUIntBE(25, 1)]}`,
    }),
};
