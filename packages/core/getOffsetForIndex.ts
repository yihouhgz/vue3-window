import type { Align } from '../types'
import { getEstimatedSize } from './getEstimatedSize'
import type { CachedBounds, SizeFunction } from './types'

export function getOffsetForIndex<Props extends object>({
  align,
  cachedBounds,
  index,
  itemCount,
  itemSize,
  containerScrollOffset,
  containerSize
}: {
  align: Align
  cachedBounds: CachedBounds
  index: number
  itemCount: number
  itemSize: number | SizeFunction<Props>
  containerScrollOffset: number
  containerSize: number
}) {
  if (index < 0 || index >= itemCount) throw new RangeError(`Invalid index ${index}`)
  const estimatedTotalSize = getEstimatedSize({ cachedBounds, itemCount, itemSize })
  const bounds = cachedBounds.get(index)
  const maxOffset = Math.max(0, Math.min(estimatedTotalSize - containerSize, bounds.scrollOffset))
  const minOffset = Math.max(0, bounds.scrollOffset - containerSize + bounds.size)
  if (align === 'smart') {
    if (containerScrollOffset >= minOffset && containerScrollOffset <= maxOffset) align = 'auto'
    else align = 'center'
  }
  switch (align) {
    case 'start':
      return maxOffset
    case 'end':
      return minOffset
    case 'center':
      if (bounds.scrollOffset <= containerSize / 2) return 0
      if (bounds.scrollOffset + bounds.size / 2 >= estimatedTotalSize - containerSize / 2)
        return estimatedTotalSize - containerSize
      return bounds.scrollOffset + bounds.size / 2 - containerSize / 2
    case 'auto':
    default:
      if (containerScrollOffset >= minOffset && containerScrollOffset <= maxOffset)
        return containerScrollOffset
      if (containerScrollOffset < minOffset) return minOffset
      return maxOffset
  }
}
