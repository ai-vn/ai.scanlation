// http://www.adobe.com/devnet-apps/photoshop/fileformatashtml/#50577409_pgfId-1037450

import { AnalyzeImage } from '../type';

const colorMap: Record<string, string | number | undefined> = {
    0: 24,
    1: 8,
    2: 8,
    3: 24,
    4: 24,
    7: 'Multi',
    8: 'Duotone',
    9: 'Lab',
};

export const psd: AnalyzeImage = {
    match: buffer => buffer.toString('hex', 0, 4) === '38425053',
    data: buffer => ({
        dimensions: {
            x: buffer.readUIntBE(14, 4),
            y: buffer.readUIntBE(18, 4),
        },
        color: `PSD-${colorMap[buffer.readUIntBE(24, 2)]}`,
    }),
};
