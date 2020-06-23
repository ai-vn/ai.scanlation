import { isError } from 'lodash';
import { FileSystemObject } from '~/modules/explorer/types';
import { execute } from '~/utils';

let cache: FileSystemObject[] = [];

const getDisks = 'wmic logicaldisk where drivetype=3 get DeviceID, VolumeName';

export const disks = async () => {
    if (cache.length) return cache;

    const result = await execute(getDisks);
    if (isError(result)) return [];

    cache = result
        .split(/\n/)
        .map(line => line.split(/:\s+/))
        .filter(line => line.length === 2)
        .map(([id, name], index) => ({
            index,
            key: name,
            name: `${id}: ${name}`,
            path: `${id}:\\`,
            ext: 'disk',
            isFolder: true,
        }));
    return cache;
};
