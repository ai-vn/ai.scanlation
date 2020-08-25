import { camelCase } from 'lodash';
import { VuexModule } from 'vuex-module-decorators';
import { NonFunctionPropertyNames } from '~/types/type';

export const StoreState = <T extends VuexModule>(module: T) => <V extends Vue>(
    target: V,
    key: NonFunctionPropertyNames<typeof module>,
): any => {
    const mutationName = camelCase(`set ${key.toString()}`);
    const mutation = (module as any)[mutationName];
    return {
        get: () => module[key],
        set:
            typeof mutation === 'function'
                ? (value: string) => mutation(value)
                : () => {
                      throw new Error(
                          `module doesn't have mutation '${mutationName}'`,
                      );
                  },
    };
};
