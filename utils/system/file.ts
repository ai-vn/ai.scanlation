import { promisify } from 'util';
import { read } from 'fs';

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
