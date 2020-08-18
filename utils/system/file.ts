import { read } from 'fs';
import { promisify } from 'util';

export const readBuffer = async (fd: number, start: number, length: number) => {
    const { buffer } = await promisify(read)(
        fd,
        Buffer.alloc(length),
        0,
        length,
        start,
    );
    return buffer;
};
