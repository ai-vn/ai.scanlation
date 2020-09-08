import { values } from 'lodash';
import { ActionItem } from '~/actions/actions.type';
import { isAction } from '~/actions/isAction';

type TActions = typeof import('~/actions').actions;

export const call = async (
    getActionOrGroup: (
        actions_: TActions,
    ) => ActionItem | { [key: string]: ActionItem },
) => {
    const { actions } = await import('~/actions');
    const actionOrGroup = getActionOrGroup(actions);

    if (isAction(actionOrGroup)) await actionOrGroup.call();
    else await Promise.all(values(actionOrGroup).map(action => action.call()));
};
