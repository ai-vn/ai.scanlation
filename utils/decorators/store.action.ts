import { VuexModule } from 'vuex-module-decorators';
import { FunctionPropertyNames } from '~/types/type';

export const StoreAction = <T extends VuexModule>(module: T) => <V extends Vue>(
    target: V,
    key: FunctionPropertyNames<typeof module>,
) =>
    Object.defineProperty(target, key, {
        value: module[key],
        enumerable: true,
    });
