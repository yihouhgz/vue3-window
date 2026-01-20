import { CachedBounds, SizeFunction } from './types';

export declare function getEstimatedSize<Props extends object>({ cachedBounds, itemCount, itemSize }: {
    cachedBounds: CachedBounds;
    itemCount: number;
    itemSize: number | SizeFunction<Props>;
}): number;
//# sourceMappingURL=getEstimatedSize.d.ts.map