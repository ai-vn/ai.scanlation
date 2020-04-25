import { camelCase } from 'lodash';

export const Render = <V extends Vue>(getValue: (self: V) => any) => <V>(
    target: V,
    key: keyof V,
) => {
    Object.defineProperty(target, camelCase(`render ${key}`), {
        get() {
            return getValue(this);
        },
        enumerable: true,
    });
};
