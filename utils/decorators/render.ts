export const Render = <V extends Vue, R = any>(
    getValue: (self: V) => R,
    property?: string,
) => <V>(target: V, key: keyof V) => {
    Object.defineProperty(target, property ?? `${key}_`, {
        get() {
            return getValue(this);
        },
        enumerable: true,
    });
};
