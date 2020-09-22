import tooltip from 'v-tooltip';
import Vue from 'vue';

Vue.use(tooltip, {
    defaultTrigger: 'hover',
    popover: {
        defaultTrigger: 'hover',
    },
});
