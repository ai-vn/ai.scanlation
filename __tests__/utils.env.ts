export const env = (...keys: string[]) => {
    const dict = new Map<string, string>();
    const save = () =>
        keys.forEach(key => dict.set(key, process.env[key] || ''));
    const load = () => keys.forEach(key => (process.env[key] = dict.get(key)));

    return { save, load };
};
