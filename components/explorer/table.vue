<template>
    <div class="mx-3 mb-3 table-custom">
        <div class="table-custom-wrapper">
            <table class="table-custom-view">
                <thead>
                    <tr>
                        <th
                            v-for="field in fields"
                            :key="field.key"
                            :data="field.key"
                            :class="[field.thClass, field.class]"
                        >
                            {{ field.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(group, groupIndex) in groupItems">
                        <tr
                            v-for="(item, itemIndex) in group"
                            :key="'row-' + item.key"
                            :class="{
                                'table-custom-view-group-start':
                                    itemIndex === 0,
                            }"
                            @click="() => rowClick(item)"
                            @dblclick="() => rowDblclick(item)"
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
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import {
    TableGroupItem,
    TableFields,
    TableOptions,
    TableObject,
} from './table';

@Component({ name: 'table-' })
export default class Table<T extends TableObject> extends Vue {
    @Prop({ type: Array })
    groupItems!: TableGroupItem<T>;

    @Prop({ type: Array })
    fields!: TableFields<T>;

    @Prop({ type: Object })
    options!: TableOptions<T>;

    get isEmpty() {
        return (
            this.groupItems.reduce(
                (sum, groupItem) => sum + groupItem.length,
                0,
            ) === 0
        );
    }

    rowClick(item: T) {
        this.options?.rowClick?.call(item, item);
    }

    rowDblclick(item: T) {
        this.options?.rowDblclick?.call(item, item);
    }
}
</script>
<style lang="postcss">
.table-custom {
    @apply rounded overflow-hidden;

    font-size: 0.875rem;

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

        tbody > tr:hover {
            background-color: var(--table-background-color-hover);
        }

        th,
        td {
            @apply px-2 py-1 border-r truncate;

            height: 20px;
            line-height: 20px;
            border-right-color: var(--line-color);
        }

        th {
            @apply font-normal sticky top-0 z-10 font-medium;

            background-color: var(--table-background-color);
            box-shadow: 0 1px 0 0 var(--line-color);

            &:hover {
                background-color: var(--table-background-color-hover);
            }
        }
    }
}
</style>
