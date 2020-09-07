/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
import { each } from 'lodash';
import mousetrap from 'mousetrap';
import { actions } from '~/actions';
import { ActionItem, ActionTree } from '~/actions/actions.type';
import { isAction } from '~/actions/isAction';

export const reset: ActionItem = {
    call() {
        mousetrap.reset();

        (function deep(actionsTree: ActionTree) {
            if (isAction(actionsTree)) {
                const { call, condition, accelerator } = actionsTree;

                const callback =
                    condition === undefined
                        ? call
                        : async () => {
                              if (await condition()) call();
                          };

                if (accelerator !== undefined)
                    mousetrap.bind(accelerator, callback);
            } else each(actionsTree, deep);
        })(actions);
    },
};
