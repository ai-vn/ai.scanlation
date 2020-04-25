/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
import mousetrap from 'mousetrap';
import { actions } from '~/modules/actions.import';
import { ActionItem } from '~/modules/actions.type';

export const resetMousetrap: ActionItem = {
    call() {
        mousetrap.reset();
        const dictionary = new Map<string, string>();
        for (const name in actions) {
            if (Object.prototype.hasOwnProperty.call(actions, name)) {
                const action = actions[name as keyof typeof actions];
                const { call, accelerator } = action;
                if (accelerator !== undefined) {
                    if (dictionary.get(accelerator) !== undefined) {
                        console.error(
                            `Shortcut '${accelerator}' has been registered by action '${name}'`,
                        );
                    }
                    dictionary.set(accelerator, name);
                    mousetrap.bind(accelerator, () => {
                        call.apply(window.$nuxt);
                    });
                }
            }
        }
    },
};
