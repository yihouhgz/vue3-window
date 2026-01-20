import { ref } from 'vue'
import type { ListImperativeAPI } from './types'

export function useListRef() {
  return ref<ListImperativeAPI | null>(null)
}
