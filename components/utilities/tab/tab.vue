<template>
    <div class="tab">
        <slot :name="value" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { every, isEqual } from 'lodash';
import { Tabs } from './tab';
import { defineProp } from '~/utils/components/vue';

export default (<T extends string>() =>
    defineComponent({
        name: 'tab-',
        props: {
            value: { type: String, required: true },
            tabs: defineProp<Tabs<T>>({
                required: true,
                type: Object,
                validator: (tabs: Tabs<T>) =>
                    !Array.isArray(tabs) &&
                    every(
                        tabs,
                        tab =>
                            typeof tab.title === 'string' &&
                            typeof tab.icon === 'string',
                    ),
            }),
        },
        setup(props, context) {
            if (
                !isEqual(
                    Object.keys(props.tabs || {}),
                    Object.keys(context.slots),
                )
            ) {
                console.error('Tab: tabs prop and slots id are invalid', [
                    Object.keys(props.tabs || {}),
                    Object.keys(context.slots),
                ]);
            }
        },
    }))();
</script>
