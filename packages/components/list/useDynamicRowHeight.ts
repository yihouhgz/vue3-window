import { ref } from 'vue'
import { DATA_ATTRIBUTE_LIST_INDEX } from './List'
import type { DynamicRowHeight } from './types'

export function useDynamicRowHeight({
  defaultRowHeight,
  key
}: {
  defaultRowHeight: number
  key?: string | number
}): DynamicRowHeight {
  const map = ref<Map<number, number>>(new Map())
  const getAverageRowHeight = () => {
    let total = 0
    map.value.forEach((h) => (total += h))
    if (total === 0) return defaultRowHeight
    return total / map.value.size
  }
  const getRowHeight = (index: number) => {
    const measured = map.value.get(index)
    if (measured !== undefined) return measured
    map.value.set(index, defaultRowHeight)
    return defaultRowHeight
  }
  const setRowHeight = (index: number, size: number) => {
    if (map.value.get(index) === size) return
    const next = new Map(map.value)
    next.set(index, size)
    map.value = next
  }
  const resizeObserver = new ResizeObserver((entries) => {
    if (entries.length === 0) return
    entries.forEach((entry) => {
      const attribute = entry.target.getAttribute(DATA_ATTRIBUTE_LIST_INDEX)
      if (attribute === null)
        throw new Error(`Invalid ${DATA_ATTRIBUTE_LIST_INDEX} attribute value`)
      const index = parseInt(attribute)
      const box = entry.borderBoxSize?.[0]
      const height = box?.blockSize || entry.contentRect.height
      if (!height) return
      setRowHeight(index, height)
    })
  })
  const observeRowElements = (elements: Element[] | NodeListOf<Element>) => {
    elements.forEach((el) => resizeObserver.observe(el))
    return () => {
      elements.forEach((el) => resizeObserver.unobserve(el))
    }
  }
  return { getAverageRowHeight, getRowHeight, setRowHeight, observeRowElements }
}
