import tooltip, { PluginOptions } from 'v-tooltip';
import Vue from 'vue';

Vue.use<PluginOptions>(tooltip, {
    defaultTrigger: 'hover',
    popover: {
        defaultTrigger: 'hover',
    },
});
