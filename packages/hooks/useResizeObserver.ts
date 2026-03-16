import { computed, onUnmounted, ref, unref, watch, type Ref, type CSSProperties } from "vue";
import { parseNumericStyleValue } from "../utils/parseNumericStyleValue";

type MaybeRef<T> = T | Ref<T>;

export function useResizeObserver({
  box,
  defaultHeight,
  defaultWidth,
  disabled: disabledProp,
  element,
  mode,
  style
}: {
  box?: ResizeObserverBoxOptions;
  defaultHeight?: number;
  defaultWidth?: number;
  disabled?: MaybeRef<boolean>;
  element: Ref<HTMLElement | null>;
  mode?: "only-height" | "only-width";
  style?: MaybeRef<CSSProperties | undefined>;
}) {
  const height = ref(defaultHeight);
  const width = ref(defaultWidth);
  let observer: ResizeObserver | null = null;

  const styleHeight = computed(() => {
    const s = unref(style);
    // @ts-ignore
    return parseNumericStyleValue(s?.height);
  });
  
  const styleWidth = computed(() => {
    const s = unref(style);
    // @ts-ignore
    return parseNumericStyleValue(s?.width);
  });

  const isDisabled = computed(() => {
     const d = unref(disabledProp);
     const sh = styleHeight.value;
     const sw = styleWidth.value;
     
     return d || 
       (mode === "only-height" && sh !== undefined) ||
       (mode === "only-width" && sw !== undefined) ||
       (sh !== undefined && sw !== undefined);
  });

  const disconnect = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  const observe = () => {
    const el = unref(element);
    if (!el || isDisabled.value) return;

    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === el) {
          const { contentRect } = entry;
          height.value = contentRect.height;
          width.value = contentRect.width;
        }
      }
    });
    observer.observe(el, { box });
  };

  watch(
    [element, isDisabled],
    () => {
      disconnect();
      observe();
    },
    { immediate: true }
  );

  onUnmounted(disconnect);

  return {
    height: computed(() => styleHeight.value ?? height.value ?? defaultHeight ?? 0),
    width: computed(() => styleWidth.value ?? width.value ?? defaultWidth ?? 0)
  };
}
