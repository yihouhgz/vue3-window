import { ref } from 'vue'
import type { ListImperativeAPI } from './types'

export function useListCallbackRef() {
  const state = ref<ListImperativeAPI | null>(null)
  const setState = (next: ListImperativeAPI | null) => {
    state.value = next
  }
  return [state, setState] as const
}
