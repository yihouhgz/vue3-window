import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  unref,
  watch,
  watchEffect,
  type CSSProperties,
  type Ref
} from "vue";
import { useResizeObserver } from "../hooks/useResizeObserver";
import type { Align } from "../types";
import { adjustScrollOffsetForRtl } from "../utils/adjustScrollOffsetForRtl";
import { shallowCompare } from "../utils/shallowCompare";
import { getEstimatedSize as getEstimatedSizeUtil } from "./getEstimatedSize";
import { getOffsetForIndex } from "./getOffsetForIndex";
import { getStartStopIndices as getStartStopIndicesUtil } from "./getStartStopIndices";
import type { Direction, SizeFunction } from "./types";
import { useCachedBounds } from "./useCachedBounds";
import { useItemSize } from "./useItemSize";

type MaybeRef<T> = T | Ref<T>;

export function useVirtualizer<Props extends object>({
  containerElement,
  containerStyle,
  defaultContainerSize = 0,
  direction,
  isRtl = false,
  itemCount,
  itemProps,
  itemSize: itemSizeProp,
  onResize,
  overscanCount
}: {
  containerElement: Ref<HTMLElement | null>;
  containerStyle?: MaybeRef<CSSProperties | undefined>;
  defaultContainerSize?: number;
  direction: Direction;
  isRtl?: MaybeRef<boolean>;
  itemCount: MaybeRef<number>;
  itemProps: MaybeRef<Props>;
  itemSize: MaybeRef<number | string | SizeFunction<Props>>;
  onResize?: (
    size: { height: number; width: number },
    prevSize: { height: number; width: number }
  ) => void;
  overscanCount: MaybeRef<number>;
}) {
  const { height, width } = useResizeObserver({
    defaultHeight:
      direction === "vertical" ? defaultContainerSize : undefined,
    defaultWidth:
      direction === "horizontal" ? defaultContainerSize : undefined,
    element: containerElement,
    mode: direction === "vertical" ? "only-height" : "only-width",
    style: containerStyle
  });

  const prevSizeRef = {
    height: 0,
    width: 0
  };

  const containerSize = computed(() =>
    direction === "vertical" ? height.value : width.value
  );

  const itemSize = useItemSize({ containerSize, itemSize: itemSizeProp });

  watch(
    [height, width],
    ([newHeight, newWidth]) => {
      if (typeof onResize === "function") {
        const prevSize = { ...prevSizeRef };
        
        if (prevSize.height !== newHeight || prevSize.width !== newWidth) {
          onResize({ height: newHeight, width: newWidth }, prevSize);
          
          prevSizeRef.height = newHeight;
          prevSizeRef.width = newWidth;
        }
      }
    }
  );

  const cachedBounds = useCachedBounds({
    itemCount,
    itemProps,
    itemSize
  });

  const getCellBounds = (index: number) => cachedBounds.value.get(index);

  const indices = ref({
    startIndexVisible: 0,
    stopIndexVisible: -1,
    startIndexOverscan: 0,
    stopIndexOverscan: -1
  });

  // Initial calculation
  watchEffect(() => {
      // Initialize indices based on default/current state
      // This is handled by the scroll listener mainly, but we need initial state
      // If we want to support defaultScrollOffset we would do it here.
      // For now, we rely on the scroll event or initial call.
      // However, in Vue, we might want to run this once.
  });

  const getEstimatedSize = () =>
    getEstimatedSizeUtil({
      cachedBounds: cachedBounds.value,
      itemCount: unref(itemCount),
      itemSize: itemSize.value
    });

  const getStartStopIndices = (scrollOffset: number) => {
    const containerScrollOffset = adjustScrollOffsetForRtl({
      containerElement: unref(containerElement),
      direction,
      isRtl: unref(isRtl),
      scrollOffset
    });

    return getStartStopIndicesUtil({
      cachedBounds: cachedBounds.value,
      containerScrollOffset,
      containerSize: containerSize.value,
      itemCount: unref(itemCount),
      overscanCount: unref(overscanCount)
    });
  };

  // Scroll listener
  const onScroll = () => {
    const el = unref(containerElement);
    if (!el) return;

    const { scrollLeft, scrollTop } = el;
    const scrollOffset = direction === "vertical" ? scrollTop : scrollLeft;
    
    // We can't easily pass the adjusted scroll offset here because adjustScrollOffsetForRtl might need the element properties
    // But getStartStopIndices handles it.

    const next = getStartStopIndices(scrollOffset);

    if (!shallowCompare(next, indices.value)) {
      indices.value = next;
    }
  };

  watch(
    [containerElement, containerSize, cachedBounds, itemCount, overscanCount, isRtl],
    () => {
       const el = unref(containerElement);
       if (el) {
           // Recalculate indices when dependencies change
           // We simulate a scroll event or just recalculate
           const { scrollLeft, scrollTop } = el;
           const scrollOffset = direction === "vertical" ? scrollTop : scrollLeft;
           const next = getStartStopIndices(scrollOffset);
           if (!shallowCompare(next, indices.value)) {
                indices.value = next;
           }
       } else {
           // If no element, use 0
           const next = getStartStopIndices(0);
           if (!shallowCompare(next, indices.value)) {
                indices.value = next;
           }
       }
    },
    { immediate: true, flush: 'post' } // flush: post to ensure element ref is updated
  );

  onMounted(() => {
    const el = unref(containerElement);
    if (el) {
      el.addEventListener("scroll", onScroll);
      // Initial check
      onScroll();
    }
  });
  
  onUnmounted(() => {
    const el = unref(containerElement);
    if (el) {
      el.removeEventListener("scroll", onScroll);
    }
  });

  // Watch for element change to re-attach listener
  watch(containerElement, (newEl, oldEl) => {
      if (oldEl) oldEl.removeEventListener("scroll", onScroll);
      if (newEl) {
          newEl.addEventListener("scroll", onScroll);
          onScroll();
      }
  });

  const scrollToIndex = ({
    align = "auto",
    containerScrollOffset,
    index
  }: {
    align?: Align;
    containerScrollOffset: number;
    index: number;
  }) => {
    let scrollOffset = getOffsetForIndex({
      align,
      cachedBounds: cachedBounds.value,
      containerScrollOffset,
      containerSize: containerSize.value,
      index,
      itemCount: unref(itemCount),
      itemSize: itemSize.value
    });

    const el = unref(containerElement);
    if (el) {
      scrollOffset = adjustScrollOffsetForRtl({
        containerElement: el,
        direction,
        isRtl: unref(isRtl),
        scrollOffset
      });

      if (typeof el.scrollTo === "function") {
        el.scrollTo(
            direction === "horizontal" ? { left: scrollOffset } : { top: scrollOffset }
        );
      } else {
         // Fallback or update indices manually if scrollTo is not supported
         const next = getStartStopIndices(scrollOffset);
         if (!shallowCompare(indices.value, next)) {
            indices.value = next;
         }
      }

      return scrollOffset;
    }
    return 0;
  };

  return {
    getCellBounds,
    getEstimatedSize,
    scrollToIndex,
    startIndexOverscan: computed(() => Math.min(unref(itemCount) - 1, indices.value.startIndexOverscan)),
    startIndexVisible: computed(() => Math.min(unref(itemCount) - 1, indices.value.startIndexVisible)),
    stopIndexOverscan: computed(() => Math.min(unref(itemCount) - 1, indices.value.stopIndexOverscan)),
    stopIndexVisible: computed(() => Math.min(unref(itemCount) - 1, indices.value.stopIndexVisible))
  };
}
