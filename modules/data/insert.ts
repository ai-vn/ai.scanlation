/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-bitwise */
import { FileObject } from '~/modules/data/type';

const { compare } = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
});

export const insert = <T extends FileObject>(items: T[], item: T) => {
    let low = 0;
    let high = items.length;

    while (low < high) {
        const mid = (low + high) >> 1;
        compare(items[mid].name, item.name) > 0
            ? (high = mid)
            : (low = mid + 1);
    }

    items.splice(low, 0, item);
};
