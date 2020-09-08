<template>
    <div class="table-custom">
        <div class="table-custom-wrapper">
            <table class="table-custom-view">
                <thead>
                    <tr>
                        <th
                            v-for="field in fields"
                            :key="field.key"
                            :data="field.key"
                            :class="[field.thClass, field.class]"
                            @click="event => headClick(field, event)"
                            @dblclick="event => headDblclick(field, event)"
                        >
                            {{ field.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td :colspan="fields.length" /></tr>
                    <template v-for="(group, groupIndex) in groupItems">
                        <tr
                            v-for="(item, itemIndex) in group"
                            :key="'row-' + item.key"
                            :class="[
                                {
                                    'table-custom-view-group-start':
                                        itemIndex === 0,
                                },
                                rowClass(item),
                            ]"
                            @click="event => rowClick(item, event)"
                            @dblclick="event => rowDblclick(item, event)"
                        >
                            <td
                                v-for="field in fields"
                                :key="'col-' + field.key"
                                :data="field.key"
                                :class="[field.tdClass, field.class]"
                            >
                                <slot
                                    :name="field.key"
                                    :field="field"
                                    :item="item"
                                />
                                {{
                                    field.show && !field.show(item, groupIndex)
                                        ? ''
                                        : field.converter
                                        ? field.converter(item, groupIndex)
                                        : item[field.key]
                                }}
                            </td>
                        </tr>
                    </template>
                    <tr v-if="$slots.empty && isEmpty">
                        <td :colspan="fields.length" class="text-center !p-3">
                            <slot name="empty" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api';
import { sumBy } from 'lodash';
import {
    TableGroupItem,
    TableFields,
    TableOptions,
    TableObject,
    TableField,
} from './table';
import { defineProp } from '~/utils';

export default (<T extends TableObject>() =>
    defineComponent({
        name: 'table-',
        props: {
            groupItems: defineProp<TableGroupItem<T>>({ type: Array }),
            fields: defineProp<TableFields<T>>({ type: Array }),
            options: defineProp<TableOptions<T>>({ type: Object }),
        },
        setup: props => ({
            isEmpty: computed(() => sumBy(props.groupItems, 'length') === 0),
            rowClass: (item: T) =>
                props.options?.rowClass?.call(item, item) || undefined,
            rowClick(item: T, event: MouseEvent) {
                const action =
                    event.button === 2 ? 'rowContextMenu' : 'rowClick';
                props.options?.[action]?.call(item, item, event);
            },
            rowDblclick(item: T, event: MouseEvent) {
                props.options?.rowDblclick?.call(item, item, event);
            },
            headClick(field: TableField<T>, event: MouseEvent) {
                const action =
                    event.button === 2 ? 'headContextMenu' : 'headClick';
                props.options?.[action]?.call(field, field, event);
            },
            headDblclick(field: TableField<T>, event: MouseEvent) {
                props.options?.headDblclick?.call(field, field, event);
            },
        }),
    }))();
</script>
<style lang="postcss">
.table-custom {
    @apply rounded overflow-hidden text-sm;

    &-wrapper {
        @apply max-h-full overflow-y-scroll overflow-x-hidden;

        background-color: var(--table-background-color);
    }

    &-view {
        @apply w-full table-auto border-collapse relative cursor-pointer;

        &-group-start {
            @apply border-t;

            border-top-color: var(--line-color);
        }

        th,
        td {
            @apply px-2 py-1 border-r truncate h-5 leading-5;

            border-right-color: var(--line-color);
        }

        th {
            @apply font-normal sticky top-0 z-10;

            background-color: var(--table-background-color);
            box-shadow: 1px 0 0 0 var(--line-color), 0 1px 0 0 var(--line-color);

            &:hover {
                background-color: var(--table-background-color-hover);
            }
        }

        tbody > tr {
            @apply border-t border-transparent;

            &:hover {
                background-color: var(--table-background-color-hover);
            }

            > td {
                &:first-child {
                    @apply border-l;

                    border-left-color: transparent;
                }

                &:last-child {
                    border-right-color: transparent;
                    box-shadow: 1px 0 0 0 var(--line-color);
                }
            }

            &.table-custom-view-group-start {
                border-top-color: var(--line-color);
            }

            &:first-child {
                border-top-color: var(--line-color);

                > td {
                    @apply h-0 p-0;
                }

                + .table-custom-view-group-start {
                    border-top-color: transparent;
                }
            }

            &.selected {
                background-color: var(--table-selected-background);

                > td {
                    &:last-child {
                        border-right-color: var(--table-selected-line);
                    }

                    &:first-child {
                        border-left-color: var(--table-selected-line);
                    }
                }
            }

            &:not(.selected) + .selected,
            &.selected + :not(.selected),
            &.selected:first-child {
                border-top-color: var(--table-selected-line);
            }

            &:last-child {
                @apply border-b;

                > td:first-child::after {
                    @apply absolute bottom-0 left-0 w-1 h-1;
                    @apply border-solid border-transparent border-l border-b rounded-bl;

                    content: '';
                }

                &.selected {
                    border-bottom-color: var(--table-selected-line);

                    > td:first-child::after {
                        border-color: var(--table-selected-line);
                    }
                }
            }
        }
    }
}
</style>
