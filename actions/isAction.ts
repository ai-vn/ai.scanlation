import { ActionItem } from '~/actions/actions.type';

export const isAction = (action: Record<string, any>): action is ActionItem =>
    typeof action === 'object' && typeof action.call === 'function';
