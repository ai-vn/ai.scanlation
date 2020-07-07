// http://www.adobe.com/devnet-apps/photoshop/fileformatashtml/#50577409_pgfId-1037450

import { AnalyzeImage } from '../type';
import { readBuffer } from '~/utils';

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
    sign: '38425053',
    data: async fd => {
        const buffer = await readBuffer(fd, 0, 26);
        return {
            dimensions: {
                x: buffer.readUIntBE(18, 4),
                y: buffer.readUIntBE(14, 4),
            },
            color: `PSD-${colorMap[buffer.readUIntBE(24, 2)]}`,
        };
    },
};
