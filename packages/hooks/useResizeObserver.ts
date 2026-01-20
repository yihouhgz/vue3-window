import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'

export function useResizeObserver({
  elementRef,
  defaultHeight = 0,
  defaultWidth = 0,
  mode = 'both'
}: {
  elementRef: Ref<HTMLElement | null>
  defaultHeight?: number
  defaultWidth?: number
  mode?: 'only-height' | 'only-width' | 'both'
}) {
  const height = ref(defaultHeight)
  const width = ref(defaultWidth)
  let ro: ResizeObserver | undefined
  onMounted(() => {
    const el = elementRef.value
    if (!el) return
    const update = (rect: DOMRectReadOnly) => {
      if (mode === 'only-height' || mode === 'both') height.value = Math.round(rect.height)
      if (mode === 'only-width' || mode === 'both') width.value = Math.round(rect.width)
    }
    update(el.getBoundingClientRect())
    ro = new ResizeObserver((entries) => {
      for (const entry of entries) update(entry.contentRect)
    })
    ro.observe(el)
  })
  onBeforeUnmount(() => {
    ro?.disconnect()
  })
  return { height, width }
}
