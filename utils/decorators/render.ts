export const Render = <V extends Vue>(getValue: (self: V) => any) => <V>(
    target: V,
    key: keyof V,
) => {
    Object.defineProperty(target, `${key}_`, {
        get() {
            return getValue(this);
        },
        enumerable: true,
    });
};
