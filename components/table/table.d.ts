export interface TableObject {
    key: string;
}

export type TableField<T extends TableObject> = {
    key: keyof T;
    converter?(item: T, groupIndex: number): string | number;
    show?(item: T, groupIndex: number): boolean;
    label: string;
    class?: string;
    thClass?: string;
    tdClass?: string;
};

export type TableFields<T extends TableObject> = Array<TableField<T>>;

export type TableOptions<T extends TableObject> = {
    rowClick?(this: T, item: T): void;
    rowDblclick?(this: T, item: T): void;

    headClick?(this: TableField<T>, field: TableField<T>): void;
    headDblclick?(this: TableField<T>, field: TableField<T>): void;
};

export type TableGroupItem<T> = Array<Array<T>>;
