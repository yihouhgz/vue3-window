import { PropType } from 'vue';
import { GridProps } from './types';

export declare const Grid: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    cellComponent: {
        type: PropType<GridProps<object>["cellComponent"]>;
        required: true;
    };
    cellProps: {
        type: PropType<GridProps<object>["cellProps"]>;
        default: () => {};
    };
    children: {
        type: null;
    };
    className: {
        type: StringConstructor;
    };
    columnCount: {
        type: NumberConstructor;
        required: true;
    };
    columnWidth: {
        type: PropType<GridProps<object>["columnWidth"]>;
        required: true;
    };
    defaultHeight: {
        type: NumberConstructor;
        default: number;
    };
    defaultWidth: {
        type: NumberConstructor;
        default: number;
    };
    dir: {
        type: PropType<"ltr" | "rtl">;
        default: string;
    };
    gridRef: {
        type: PropType<any>;
    };
    onCellsRendered: {
        type: PropType<NonNullable<GridProps<object>["onCellsRendered"]>>;
    };
    onResize: {
        type: PropType<NonNullable<GridProps<object>["onResize"]>>;
    };
    overscanCount: {
        type: NumberConstructor;
        default: number;
    };
    rowCount: {
        type: NumberConstructor;
        required: true;
    };
    rowHeight: {
        type: PropType<GridProps<object>["rowHeight"]>;
        required: true;
    };
    style: {
        type: PropType<any>;
    };
    tagName: {
        type: PropType<GridProps<object>["tagName"]>;
        default: string;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    cellComponent: {
        type: PropType<GridProps<object>["cellComponent"]>;
        required: true;
    };
    cellProps: {
        type: PropType<GridProps<object>["cellProps"]>;
        default: () => {};
    };
    children: {
        type: null;
    };
    className: {
        type: StringConstructor;
    };
    columnCount: {
        type: NumberConstructor;
        required: true;
    };
    columnWidth: {
        type: PropType<GridProps<object>["columnWidth"]>;
        required: true;
    };
    defaultHeight: {
        type: NumberConstructor;
        default: number;
    };
    defaultWidth: {
        type: NumberConstructor;
        default: number;
    };
    dir: {
        type: PropType<"ltr" | "rtl">;
        default: string;
    };
    gridRef: {
        type: PropType<any>;
    };
    onCellsRendered: {
        type: PropType<NonNullable<GridProps<object>["onCellsRendered"]>>;
    };
    onResize: {
        type: PropType<NonNullable<GridProps<object>["onResize"]>>;
    };
    overscanCount: {
        type: NumberConstructor;
        default: number;
    };
    rowCount: {
        type: NumberConstructor;
        required: true;
    };
    rowHeight: {
        type: PropType<GridProps<object>["rowHeight"]>;
        required: true;
    };
    style: {
        type: PropType<any>;
    };
    tagName: {
        type: PropType<GridProps<object>["tagName"]>;
        default: string;
    };
}>> & Readonly<{}>, {
    overscanCount: number;
    defaultHeight: number;
    defaultWidth: number;
    cellProps: object;
    tagName: "div" | undefined;
    dir: "ltr" | "rtl";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=Grid.d.ts.map