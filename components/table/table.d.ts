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
    rowClass?(
        this: T,
        item: T,
    ): string | string[] | Record<string, boolean> | Record<string, boolean>[];

    rowClick?(this: T, item: T, event: MouseEvent): void;
    rowContextMenu?(this: T, item: T, event: MouseEvent): void;
    rowDblclick?(this: T, item: T, event: Event): void;

    headClick?(
        this: TableField<T>,
        field: TableField<T>,
        event: MouseEvent,
    ): void;
    headContextMenu?(
        this: TableField<T>,
        field: TableField<T>,
        event: MouseEvent,
    ): void;
    headDblclick?(
        this: TableField<T>,
        field: TableField<T>,
        event: Event,
    ): void;
};

export type TableGroupItem<T extends TableObject> = Array<Array<T>>;
