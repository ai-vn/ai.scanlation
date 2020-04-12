/* eslint-disable no-restricted-syntax */
import { Context } from '@nuxt/types';
import mousetrap from 'mousetrap';
import * as windows from './electron/windows';
import * as routers from './pages/routers';
import { Action } from '~/modules/utils.type';

const actions = { ...windows, ...routers };

export class AppUtils {
    private context: Context;

    do(getAction: (_actions: typeof actions) => Action) {
        getAction(actions).call.apply(this.context);
    }

    constructor(context: Context) {
        this.context = context;
        this.resetMousetrap();
    }

    public resetMousetrap() {
        mousetrap.reset();
        const dictionary: { [key: string]: string } = {};
        for (const name in actions) {
            if (Object.prototype.hasOwnProperty.call(actions, name)) {
                const action = actions[name as keyof typeof actions];
                const { call, accelerator } = action;
                if (accelerator !== undefined) {
                    if (dictionary[accelerator] !== undefined) {
                        console.error(
                            `Shortcut '${accelerator}' has been registered by action '${name}'`,
                        );
                    }
                    dictionary[accelerator] = name;
                    mousetrap.bind(accelerator, () => {
                        call.apply(this.context);
                    });
                }
            }
        }
    }
}
