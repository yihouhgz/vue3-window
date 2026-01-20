export type Direction = 'vertical' | 'horizontal';
export type Bounds = {
    size: number;
    scrollOffset: number;
};
export type SizeFunction<Props extends object> = (index: number, props: Props) => number;
export type CachedBounds = {
    get: (index: number) => Bounds;
    set: (index: number, bounds: Bounds) => void;
    size: number;
};
//# sourceMappingURL=types.d.ts.map