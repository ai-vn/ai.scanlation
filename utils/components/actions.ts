import { SetupContext } from '@nuxtjs/composition-api';
import { computeds, defineProp } from './vue';
import { ActionItem } from '~/actions/actions.type';
import { isAction } from '~/actions/isAction';

export type ActionProps = {
    action?: ActionItem;
    icon?: string;
    shortcut?: string;
    title?: string;
};

export const useAction = (props: ActionProps, { emit }: SetupContext) =>
    computeds({
        title_: () => props.title ?? props.action?.title,
        shortcut_: () => props.shortcut ?? props.action?.accelerator,
        icon_: () => props.icon ?? props.action?.icon,
        action_: () => (event: MouseEvent) => {
            props.action?.call();
            emit('click', event);
        },
    });

export const actionProps = {
    action: defineProp<ActionItem>({ type: Object, validator: isAction }),
    icon: { type: String },
    shortcut: { type: String },
    title: { type: String },
};
