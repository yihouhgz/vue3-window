import type { CachedBounds, SizeFunction } from './types'

export function getEstimatedSize<Props extends object>({
  cachedBounds,
  itemCount,
  itemSize
}: {
  cachedBounds: CachedBounds
  itemCount: number
  itemSize: number | SizeFunction<Props>
}) {
  if (itemCount === 0) return 0
  if (typeof itemSize === 'number') return itemCount * itemSize
  const last = cachedBounds.get(cachedBounds.size === 0 ? 0 : cachedBounds.size - 1)
  const average = (last.scrollOffset + last.size) / cachedBounds.size
  return itemCount * average
}
