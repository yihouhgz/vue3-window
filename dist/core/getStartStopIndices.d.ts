import { CachedBounds } from './types';

export declare function getStartStopIndices({ cachedBounds, containerScrollOffset, containerSize, itemCount, overscanCount }: {
    cachedBounds: CachedBounds;
    containerScrollOffset: number;
    containerSize: number;
    itemCount: number;
    overscanCount: number;
}): {
    startIndexVisible: number;
    stopIndexVisible: number;
    startIndexOverscan: number;
    stopIndexOverscan: number;
};
//# sourceMappingURL=getStartStopIndices.d.ts.map