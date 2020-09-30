import { defineNuxtPlugin } from '@nuxtjs/composition-api';
import { actions } from '~/actions';

export default defineNuxtPlugin(() => {
    actions.settings.shortcuts.reset.call();
});
