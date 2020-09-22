import { extname } from 'path';

export const toExt = (name: string) =>
    extname(`_${name}`).replace(/^\./, '').toLocaleLowerCase();
