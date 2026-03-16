import { onMounted, ref, unref, watch, watchEffect, type Ref } from "vue";
import { isRtl } from "../utils/isRtl";
import type { HTMLAttributes } from "vue";

export function useIsRtl(
  element: Ref<HTMLElement | null>,
  dir: HTMLAttributes["dir"]
) {
  const value = ref(dir === "rtl");

  watchEffect(() => {
    const el = unref(element);
    if (el) {
      if (!dir) {
        value.value = isRtl(el);
      } else {
        value.value = dir === "rtl";
      }
    }
  });

  return value;
}
