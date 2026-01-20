import { ref } from "vue";
import type { GridImperativeAPI } from "./types";

export function useGridRef() {
  return ref<GridImperativeAPI | null>(null);
}
