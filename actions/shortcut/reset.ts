/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
import mousetrap from 'mousetrap';
import { actions } from '~/actions/actions.import';
import { ActionItem } from '~/actions/actions.type';

export const resetMousetrap: ActionItem = {
    call() {
        mousetrap.reset();
        const dictionary = new Map<string, string>();
        for (const name in actions) {
            if (Object.prototype.hasOwnProperty.call(actions, name)) {
                const action = actions[name as keyof typeof actions];
                const { call, accelerator, condition } = action;

                const callback =
                    condition === undefined
                        ? call
                        : async () => {
                              if (await condition()) call();
                          };

                if (accelerator !== undefined) {
                    dictionary.set(accelerator, name);
                    mousetrap.bind(accelerator, callback);
                }
            }
        }
    },
};
