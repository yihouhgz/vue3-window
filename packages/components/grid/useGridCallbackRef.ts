import { ref } from "vue";
import type { GridImperativeAPI } from "./types";

export function useGridCallbackRef() {
  const state = ref<GridImperativeAPI | null>(null);
  const setState = (next: GridImperativeAPI | null) => {
    state.value = next;
  };
  return [state, setState] as const;
}
