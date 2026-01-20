import { GridImperativeAPI } from './types';

export declare function useGridRef(): import('vue').Ref<{
    readonly element: HTMLDivElement | null;
    scrollToCell: ({ behavior, columnAlign, columnIndex, rowAlign, rowIndex }: {
        behavior?: "auto" | "instant" | "smooth";
        columnAlign?: "auto" | "center" | "end" | "smart" | "start";
        columnIndex: number;
        rowAlign?: "auto" | "center" | "end" | "smart" | "start";
        rowIndex: number;
    }) => void;
    scrollToColumn: ({ align, behavior, index }: {
        align?: "auto" | "center" | "end" | "smart" | "start";
        behavior?: "auto" | "instant" | "smooth";
        index: number;
    }) => void;
    scrollToRow: ({ align, behavior, index }: {
        align?: "auto" | "center" | "end" | "smart" | "start";
        behavior?: "auto" | "instant" | "smooth";
        index: number;
    }) => void;
} | null, GridImperativeAPI | {
    readonly element: HTMLDivElement | null;
    scrollToCell: ({ behavior, columnAlign, columnIndex, rowAlign, rowIndex }: {
        behavior?: "auto" | "instant" | "smooth";
        columnAlign?: "auto" | "center" | "end" | "smart" | "start";
        columnIndex: number;
        rowAlign?: "auto" | "center" | "end" | "smart" | "start";
        rowIndex: number;
    }) => void;
    scrollToColumn: ({ align, behavior, index }: {
        align?: "auto" | "center" | "end" | "smart" | "start";
        behavior?: "auto" | "instant" | "smooth";
        index: number;
    }) => void;
    scrollToRow: ({ align, behavior, index }: {
        align?: "auto" | "center" | "end" | "smart" | "start";
        behavior?: "auto" | "instant" | "smooth";
        index: number;
    }) => void;
} | null>;
//# sourceMappingURL=useGridRef.d.ts.map