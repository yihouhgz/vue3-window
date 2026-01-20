import { Ref } from 'vue';

export declare function useResizeObserver({ elementRef, defaultHeight, defaultWidth, mode }: {
    elementRef: Ref<HTMLElement | null>;
    defaultHeight?: number;
    defaultWidth?: number;
    mode?: 'only-height' | 'only-width' | 'both';
}): {
    height: Ref<number, number>;
    width: Ref<number, number>;
};
//# sourceMappingURL=useResizeObserver.d.ts.map