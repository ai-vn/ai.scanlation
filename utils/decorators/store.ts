import { VuexModule } from 'vuex-module-decorators';
import { camelCase } from 'lodash';

const toSet = (key: string) => camelCase(`set ${key}`);

export const State = (module: VuexModule) => <V extends Vue>(
    target: V,
    key: string,
): any => {
    const mutationName = toSet(key.toString());
    const mutation = (module as any)[mutationName];
    if (typeof mutation !== 'function') {
        throw new Error(
            `module '${module.namespaced}' doesn't have mutation '${mutationName}'`,
        );
    }
    return {
        get: () => (module as any)[key],
        set: (value: string) => mutation(value),
    };
};
