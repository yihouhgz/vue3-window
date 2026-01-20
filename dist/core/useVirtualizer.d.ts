import { Ref } from 'vue';
import { Direction, SizeFunction } from './types';

export declare function useVirtualizer<Props extends object>({ containerElementRef, containerStyle, defaultContainerSize, direction, itemCount, itemProps, itemSize, overscanCount }: {
    containerElementRef: Ref<HTMLElement | null>;
    containerStyle?: Partial<CSSStyleDeclaration>;
    defaultContainerSize?: number;
    direction: Direction;
    itemCount: number;
    itemProps: Props;
    itemSize: number | string | SizeFunction<Props>;
    overscanCount: number;
}): {
    getCellBounds: (index: number) => import('./types').Bounds;
    getEstimatedSize: () => number;
    scrollToIndex: ({ align, index }: {
        align?: "auto" | "center" | "end" | "smart" | "start";
        index: number;
    }) => number | undefined;
    startIndexOverscan: import('vue').ComputedRef<number>;
    startIndexVisible: import('vue').ComputedRef<number>;
    stopIndexOverscan: import('vue').ComputedRef<number>;
    stopIndexVisible: import('vue').ComputedRef<number>;
};
//# sourceMappingURL=useVirtualizer.d.ts.map