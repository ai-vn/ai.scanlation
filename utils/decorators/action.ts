import Vue from 'vue';
import { VuePropertyDecorator } from './decorators.type.d';
import { actions } from '~/actions/actions.import';
import { ActionItem } from '~/actions/actions.type';

type GetActionType = (actions_: typeof actions) => ActionItem;
type KeyType = keyof typeof actions;

export function Action<V extends Vue>(target: V, key: KeyType): void;
export function Action<V extends Vue>(
    getActionCallback: GetActionType,
): VuePropertyDecorator<V>;
export function Action<V extends Vue>(
    targetOrGetAction: V | GetActionType,
    key_?: KeyType,
): void | VuePropertyDecorator<V> {
    function defineProperty(action: ActionItem, target: V, key: string) {
        Object.defineProperty(target, key, { value: action, enumerable: true });
    }
    if (typeof targetOrGetAction !== 'function') {
        const action = actions[key_ as KeyType];
        return defineProperty(action, targetOrGetAction, key_ as KeyType);
    }
    return (target, key) => {
        const action = targetOrGetAction(actions);
        return defineProperty(action, target, key);
    };
}
