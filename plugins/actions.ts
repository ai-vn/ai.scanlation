/* eslint-disable no-restricted-syntax */
import { Plugin } from '@nuxt/types';
import { actions } from '~/modules/actions.import';
import { ActionItem } from '~/modules/actions.type';

const actionInject = (getAction: (_actions: typeof actions) => ActionItem) =>
    getAction(actions).call.apply(window.$nuxt);

const plugin: Plugin = (context, inject) => {
    actions.resetMousetrap.call.apply(window.$nuxt);
    inject('action', actionInject);
};

export type ActionsInject = typeof actionInject;

export default plugin;
