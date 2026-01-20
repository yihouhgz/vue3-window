import { ref, computed, onMounted, Ref } from 'vue'
import { useResizeObserver } from '../hooks/useResizeObserver'
import { createCachedBounds } from './createCachedBounds'
import { getEstimatedSize } from './getEstimatedSize'
import { getStartStopIndices } from './getStartStopIndices'
import { getOffsetForIndex } from './getOffsetForIndex'
import type { Direction, SizeFunction, CachedBounds as CachedBoundsType } from './types'

export function useVirtualizer<Props extends object>({
  containerElementRef,
  containerStyle,
  defaultContainerSize = 0,
  direction,
  itemCount,
  itemProps,
  itemSize,
  overscanCount
}: {
  containerElementRef: Ref<HTMLElement | null>
  containerStyle?: Partial<CSSStyleDeclaration>
  defaultContainerSize?: number
  direction: Direction
  itemCount: number
  itemProps: Props
  itemSize: number | string | SizeFunction<Props>
  overscanCount: number
}) {
  const { height, width } = useResizeObserver({
    elementRef: containerElementRef,
    defaultHeight: direction === 'vertical' ? defaultContainerSize : 0,
    defaultWidth: direction === 'horizontal' ? defaultContainerSize : 0,
    mode: direction === 'vertical' ? 'only-height' : 'only-width'
  })
  const containerSize = computed(() => (direction === 'vertical' ? height.value : width.value))
  const resolvedItemSize: number | SizeFunction<Props> =
    typeof itemSize === 'string'
      ? (containerSize.value * parseFloat(itemSize)) / 100
      : (itemSize as number | SizeFunction<Props>)
  const cachedBounds = computed<CachedBoundsType>(() =>
    createCachedBounds({ itemCount, itemProps, itemSize: resolvedItemSize })
  )
  const indices = ref(
    getStartStopIndices({
      cachedBounds: cachedBounds.value,
      containerScrollOffset: 0,
      containerSize: containerSize.value,
      itemCount,
      overscanCount
    })
  )
  const startIndexVisible = computed(() => Math.min(itemCount - 1, indices.value.startIndexVisible))
  const stopIndexVisible = computed(() => Math.min(itemCount - 1, indices.value.stopIndexVisible))
  const startIndexOverscan = computed(() =>
    Math.min(itemCount - 1, indices.value.startIndexOverscan)
  )
  const stopIndexOverscan = computed(() => Math.min(itemCount - 1, indices.value.stopIndexOverscan))
  const getCellBounds = (index: number) => cachedBounds.value.get(index)
  const getEstimatedSizeFn = () =>
    getEstimatedSize({ cachedBounds: cachedBounds.value, itemCount, itemSize: resolvedItemSize })
  const getStartStopIndicesFn = (scrollOffset: number) =>
    getStartStopIndices({
      cachedBounds: cachedBounds.value,
      containerScrollOffset: scrollOffset,
      containerSize: containerSize.value,
      itemCount,
      overscanCount
    })
  onMounted(() => {
    const el = containerElementRef.value
    const scrollOffset = direction === 'vertical' ? (el?.scrollTop ?? 0) : (el?.scrollLeft ?? 0)
    indices.value = getStartStopIndicesFn(scrollOffset)
    if (!el) return
    const onScroll = () => {
      const offset = direction === 'vertical' ? el.scrollTop : el.scrollLeft
      const next = getStartStopIndices({
        cachedBounds: cachedBounds.value,
        containerScrollOffset: offset,
        containerSize: containerSize.value,
        itemCount,
        overscanCount
      })
      const prev = indices.value
      if (
        prev.startIndexVisible === next.startIndexVisible &&
        prev.stopIndexVisible === next.stopIndexVisible &&
        prev.startIndexOverscan === next.startIndexOverscan &&
        prev.stopIndexOverscan === next.stopIndexOverscan
      )
        return
      indices.value = next
    }
    el.addEventListener('scroll', onScroll)
  })
  const scrollToIndex = ({
    align = 'auto',
    index
  }: {
    align?: 'auto' | 'center' | 'end' | 'smart' | 'start'
    index: number
  }) => {
    const el = containerElementRef.value
    const containerScrollOffset =
      direction === 'vertical' ? (el?.scrollTop ?? 0) : (el?.scrollLeft ?? 0)
    const offset = getOffsetForIndex({
      align,
      cachedBounds: cachedBounds.value,
      containerScrollOffset,
      containerSize: containerSize.value,
      index,
      itemCount,
      itemSize: resolvedItemSize
    })
    if (el) {
      if (direction === 'vertical') el.scrollTo({ top: offset })
      else el.scrollTo({ left: offset })
      return offset
    }
  }
  return {
    getCellBounds,
    getEstimatedSize: getEstimatedSizeFn,
    scrollToIndex,
    startIndexOverscan,
    startIndexVisible,
    stopIndexOverscan,
    stopIndexVisible
  }
}
