import { CSSProperties } from 'vue';
import { TagNames } from '../../types';

export type DynamicRowHeight = {
    getAverageRowHeight(): number;
    getRowHeight(index: number): number | undefined;
    setRowHeight(index: number, size: number): void;
    observeRowElements: (elements: Element[] | NodeListOf<Element>) => () => void;
};
type ForbiddenKeys = 'ariaAttributes' | 'index' | 'style';
type ExcludeForbiddenKeys<Type> = {
    [Key in keyof Type]: Key extends ForbiddenKeys ? never : Type[Key];
};
export type ListProps<RowProps extends object, TagName extends TagNames = 'div'> = {
    children?: any;
    className?: string;
    defaultHeight?: number;
    listRef?: any;
    onResize?: (size: {
        height: number;
        width: number;
    }, prevSize: {
        height: number;
        width: number;
    }) => void;
    onRowsRendered?: (visibleRows: {
        startIndex: number;
        stopIndex: number;
    }, allRows: {
        startIndex: number;
        stopIndex: number;
    }) => void;
    overscanCount?: number;
    rowComponent: (props: {
        ariaAttributes: {
            'aria-posinset': number;
            'aria-setsize': number;
            role: 'listitem';
        };
        index: number;
        style: CSSProperties;
    } & RowProps) => any;
    rowCount: number;
    rowHeight: number | string | ((index: number, cellProps: RowProps) => number) | DynamicRowHeight;
    rowProps: ExcludeForbiddenKeys<RowProps>;
    style?: CSSProperties;
    tagName?: TagName;
};
export interface ListImperativeAPI {
    get element(): HTMLDivElement | null;
    scrollToRow: ({ align, behavior, index }: {
        align?: 'auto' | 'center' | 'end' | 'smart' | 'start';
        behavior?: 'auto' | 'instant' | 'smooth';
        index: number;
    }) => void;
}
export type RowComponent<RowProps extends object> = ListProps<RowProps>['rowComponent'];
export type RowComponentProps<RowProps extends object = object> = Parameters<RowComponent<RowProps>>[0];
export type OnRowsRendered = NonNullable<ListProps<object>['onRowsRendered']>;
export {};
//# sourceMappingURL=types.d.ts.map