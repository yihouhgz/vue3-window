import type { Bounds, CachedBounds, SizeFunction } from './types'

export function createCachedBounds<Props extends object>({
  itemCount,
  itemProps,
  itemSize
}: {
  itemCount: number
  itemProps: Props
  itemSize: number | SizeFunction<Props>
}): CachedBounds {
  const cache = new Map<number, Bounds>()
  return {
    get(index: number) {
      if (index >= itemCount) throw new RangeError(`Invalid index ${index}`)
      while (cache.size - 1 < index) {
        const currentIndex = cache.size
        let size: number
        if (typeof itemSize === 'function') size = itemSize(currentIndex, itemProps)
        else size = itemSize
        if (currentIndex === 0) cache.set(currentIndex, { size, scrollOffset: 0 })
        else {
          const prev = cache.get(currentIndex - 1)
          if (!prev) throw new Error(`Bounds miss for ${index}`)
          cache.set(currentIndex, { size, scrollOffset: prev.scrollOffset + prev.size })
        }
      }
      const bounds = cache.get(index)
      if (!bounds) throw new Error(`Bounds miss for ${index}`)
      return bounds
    },
    set(index: number, bounds: Bounds) {
      cache.set(index, bounds)
    },
    get size() {
      return cache.size
    }
  }
}
