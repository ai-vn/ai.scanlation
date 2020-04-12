import { Context } from '@nuxt/types';
import * as windows from './electron/windows';
import { Action } from '~/modules/utils.type';

const actions = { ...windows };

export class AppUtils {
    private context: Context;

    do(getAction: (_actions: typeof actions) => Action) {
        getAction(actions).call.apply(this.context);
    }

    constructor(context: Context) {
        this.context = context;
    }
}
