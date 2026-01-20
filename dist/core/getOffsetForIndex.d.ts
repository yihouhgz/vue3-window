import { Align } from '../types';
import { CachedBounds, SizeFunction } from './types';

export declare function getOffsetForIndex<Props extends object>({ align, cachedBounds, index, itemCount, itemSize, containerScrollOffset, containerSize }: {
    align: Align;
    cachedBounds: CachedBounds;
    index: number;
    itemCount: number;
    itemSize: number | SizeFunction<Props>;
    containerScrollOffset: number;
    containerSize: number;
}): number;
//# sourceMappingURL=getOffsetForIndex.d.ts.map