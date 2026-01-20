import type { DynamicRowHeight } from './types'

export function isDynamicRowHeight(value: unknown): value is DynamicRowHeight {
  if (!value || typeof value !== 'object') return false
  const v = value as DynamicRowHeight
  return (
    typeof v.getAverageRowHeight === 'function' &&
    typeof v.getRowHeight === 'function' &&
    typeof v.setRowHeight === 'function' &&
    typeof v.observeRowElements === 'function'
  )
}
