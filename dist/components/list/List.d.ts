import { PropType } from 'vue';
import { ListProps } from './types';

export declare const DATA_ATTRIBUTE_LIST_INDEX = "data-react-window-index";
export declare const List: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    children: {
        type: null;
    };
    className: {
        type: StringConstructor;
    };
    defaultHeight: {
        type: NumberConstructor;
        default: number;
    };
    listRef: {
        type: PropType<any>;
    };
    onResize: {
        type: PropType<NonNullable<ListProps<object>["onResize"]>>;
    };
    onRowsRendered: {
        type: PropType<NonNullable<ListProps<object>["onRowsRendered"]>>;
    };
    overscanCount: {
        type: NumberConstructor;
        default: number;
    };
    rowComponent: {
        type: PropType<ListProps<object>["rowComponent"]>;
        required: true;
    };
    rowCount: {
        type: NumberConstructor;
        required: true;
    };
    rowHeight: {
        type: PropType<ListProps<object>["rowHeight"]>;
        required: true;
    };
    rowProps: {
        type: PropType<ListProps<object>["rowProps"]>;
        default: () => {};
    };
    tagName: {
        type: PropType<ListProps<object>["tagName"]>;
        default: string;
    };
    style: {
        type: PropType<any>;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    children: {
        type: null;
    };
    className: {
        type: StringConstructor;
    };
    defaultHeight: {
        type: NumberConstructor;
        default: number;
    };
    listRef: {
        type: PropType<any>;
    };
    onResize: {
        type: PropType<NonNullable<ListProps<object>["onResize"]>>;
    };
    onRowsRendered: {
        type: PropType<NonNullable<ListProps<object>["onRowsRendered"]>>;
    };
    overscanCount: {
        type: NumberConstructor;
        default: number;
    };
    rowComponent: {
        type: PropType<ListProps<object>["rowComponent"]>;
        required: true;
    };
    rowCount: {
        type: NumberConstructor;
        required: true;
    };
    rowHeight: {
        type: PropType<ListProps<object>["rowHeight"]>;
        required: true;
    };
    rowProps: {
        type: PropType<ListProps<object>["rowProps"]>;
        default: () => {};
    };
    tagName: {
        type: PropType<ListProps<object>["tagName"]>;
        default: string;
    };
    style: {
        type: PropType<any>;
    };
}>> & Readonly<{}>, {
    overscanCount: number;
    defaultHeight: number;
    tagName: "div" | undefined;
    rowProps: object;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=List.d.ts.map