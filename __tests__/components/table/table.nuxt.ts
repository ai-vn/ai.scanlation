import { shallowMount } from '@vue/test-utils';
import { Vue } from 'nuxt-property-decorator';
import {
    TableOptions,
    TableGroupItem,
    TableFields,
    TableObject,
} from '~/components/table/table';
import table from '~/components/table/table.vue';

interface TempObject extends TableObject {
    id: number;
    key: string;
}

describe('components/table/table', () => {
    it('should mounted', () => {
        expect.hasAssertions();

        const groupItems: TableGroupItem<TempObject> = [
            [
                { id: 1, key: 'a' },
                { id: 2, key: 'b' },
            ],
        ];
        const fields: TableFields<TempObject> = [
            {
                key: 'id',
                label: '#',
            },
        ];
        const options: TableOptions<TempObject> = {
            rowClick: jest.fn(),
            rowDblclick: jest.fn(),
            headClick: jest.fn(),
            headDblclick: jest.fn(),
        };

        const wrapper = shallowMount<
            Vue & {
                isEmpty: boolean;
            }
        >(table, {
            propsData: {
                groupItems,
                fields,
                options,
            },
        });
        expect(wrapper.vm).toBeInstanceOf(Vue);
        expect(wrapper.vm.isEmpty).toStrictEqual(false);

        const row = wrapper.vm.$el.querySelector<HTMLTableRowElement>(
            'tbody > tr:nth-child(2)',
        );
        expect(row).toBeInstanceOf(HTMLTableRowElement);

        row?.dispatchEvent(new MouseEvent('click', { button: 0 }));
        row?.dispatchEvent(new MouseEvent('click', { button: 2 }));
        row?.dispatchEvent(new MouseEvent('dblclick'));

        expect(options.rowClick).toHaveBeenCalledWith(
            groupItems[0][0],
            new MouseEvent('click'),
        );
        expect(options.rowDblclick).toHaveBeenCalledWith(
            groupItems[0][0],
            new MouseEvent('dbclick'),
        );

        const head = wrapper.vm.$el.querySelector<HTMLTableCellElement>(
            'thead > tr > th',
        );
        expect(head).toBeInstanceOf(HTMLTableCellElement);

        head?.dispatchEvent(new MouseEvent('click', { button: 0 }));
        head?.dispatchEvent(new MouseEvent('click', { button: 2 }));
        head?.dispatchEvent(new MouseEvent('dblclick'));

        expect(options.headClick).toHaveBeenCalledWith(
            fields[0],
            new MouseEvent('click'),
        );
        expect(options.headDblclick).toHaveBeenCalledWith(
            fields[0],
            new MouseEvent('dbclick'),
        );
    });
});
