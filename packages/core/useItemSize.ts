import { computed, unref, type Ref } from "vue";
import { assert } from "../utils/assert";
import type { SizeFunction } from "./types";

type MaybeRef<T> = T | Ref<T>;

export function useItemSize<Props extends object>({
  containerSize,
  itemSize: itemSizeProp
}: {
  containerSize: MaybeRef<number>;
  itemSize: MaybeRef<number | string | SizeFunction<Props>>;
}) {
  return computed(() => {
    const itemSize = unref(itemSizeProp);
    const size = unref(containerSize);

    switch (typeof itemSize) {
      case "string": {
        assert(
          itemSize.endsWith("%"),
          `Invalid item size: "${itemSize}"; string values must be percentages (e.g. "100%")`
        );
        assert(
          size !== undefined,
          "Container size must be defined if a percentage item size is specified"
        );

        return (size * parseInt(itemSize, 10)) / 100;
      }
      default: {
        return itemSize;
      }
    }
  });
}
