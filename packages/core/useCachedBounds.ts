import { computed, unref, type Ref } from "vue";
import { createCachedBounds } from "./createCachedBounds";
import type { CachedBounds, SizeFunction } from "./types";

type MaybeRef<T> = T | Ref<T>;

export function useCachedBounds<Props extends object>({
  itemCount,
  itemProps,
  itemSize
}: {
  itemCount: MaybeRef<number>;
  itemProps: MaybeRef<Props>;
  itemSize: MaybeRef<number | SizeFunction<Props>>;
}): Ref<CachedBounds> {
  return computed(() =>
    createCachedBounds({
      itemCount: unref(itemCount),
      itemProps: unref(itemProps),
      itemSize: unref(itemSize)
    })
  );
}
