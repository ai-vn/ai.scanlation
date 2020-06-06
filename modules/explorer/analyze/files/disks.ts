import { execute } from '~/utils';
import { FileSystemObject } from '~/modules/explorer/types';

let cache: FileSystemObject[] = [];

export const disks = async () => {
    if (cache.length === 0) {
        const result = await execute(
            'wmic logicaldisk where drivetype=3 get DeviceID, VolumeName',
        );
        cache =
            result
                .split(/\n/)
                .map(line => line.split(/:\s+/))
                .filter(line => line.length === 2)
                ?.map<FileSystemObject>(([id, name], index) => {
                    const out: FileSystemObject = {
                        index,
                        key: name,
                        name: `${id}: ${name}`,
                        path: `${id}:\\`,
                        ext: 'disk',
                        isFolder: true,
                    };
                    return out;
                }) ?? [];
    }
    return cache;
};
