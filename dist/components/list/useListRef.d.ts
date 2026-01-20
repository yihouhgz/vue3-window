import { ListImperativeAPI } from './types';

export declare function useListRef(): import('vue').Ref<{
    readonly element: HTMLDivElement | null;
    scrollToRow: ({ align, behavior, index }: {
        align?: "auto" | "center" | "end" | "smart" | "start";
        behavior?: "auto" | "instant" | "smooth";
        index: number;
    }) => void;
} | null, ListImperativeAPI | {
    readonly element: HTMLDivElement | null;
    scrollToRow: ({ align, behavior, index }: {
        align?: "auto" | "center" | "end" | "smart" | "start";
        behavior?: "auto" | "instant" | "smooth";
        index: number;
    }) => void;
} | null>;
//# sourceMappingURL=useListRef.d.ts.map