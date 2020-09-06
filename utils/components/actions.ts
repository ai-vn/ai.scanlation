import { SetupContext } from '@nuxtjs/composition-api';
import { defineProp } from './vue';
import { ActionItem } from '~/actions/actions.type';
import { isAction } from '~/actions/isAction';

export type ActionProps = {
    action?: ActionItem;
    icon?: string;
    shortcut?: string;
    title?: string;
};

export const actionRender = (props: ActionProps, { emit }: SetupContext) => ({
    title_: props.action?.title ?? props.title,
    shortcut_: props.action?.accelerator ?? props.shortcut,
    icon_: props.action?.icon ?? props.icon,
    action_: (event: MouseEvent) => {
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
