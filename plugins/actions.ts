import { Plugin } from '@nuxt/types';
import { actions } from '~/actions/actions.import';
import { ActionItem } from '~/actions/actions.type';

const actionInject = (getAction: (_actions: typeof actions) => ActionItem) =>
    getAction(actions).call();

const plugin: Plugin = (context, inject) => {
    actions.resetMousetrap.call();
    inject('action', actionInject);
};

export type ActionsInject = typeof actionInject;

export default plugin;
