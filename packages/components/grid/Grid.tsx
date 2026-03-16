import {
  computed,
  defineComponent,
  h,
  ref,
  toRef,
  unref,
  watchEffect,
  type CSSProperties,
  type PropType,
  type VNode
} from "vue";
import { useVirtualizer } from "../../core/useVirtualizer";
import { useIsRtl } from "../../core/useIsRtl";
import type { GridProps, GridImperativeAPI } from "./types";
import type { Align } from "../../types";

export default defineComponent({
  name: "Grid",
  props: {
    cellComponent: {
      type: Object as PropType<GridProps["cellComponent"]>,
      required: true
    },
    cellProps: {
      type: Object as PropType<GridProps["cellProps"]>,
      default: () => ({})
    },
    children: {
      type: [Object, Array] as PropType<VNode | VNode[]>,
      required: false
    },
    className: {
      type: String,
      default: undefined
    },
    columnCount: {
      type: Number,
      required: true
    },
    columnWidth: {
      type: [Number, String, Function] as PropType<GridProps["columnWidth"]>,
      required: true
    },
    defaultHeight: {
      type: Number,
      default: 0
    },
    defaultWidth: {
      type: Number,
      default: 0
    },
    dir: {
      type: String as PropType<"ltr" | "rtl">,
      default: undefined
    },
    onCellsRendered: {
      type: Function as PropType<GridProps["onCellsRendered"]>,
      default: undefined
    },
    onResize: {
      type: Function as PropType<GridProps["onResize"]>,
      default: undefined
    },
    overscanCount: {
      type: Number,
      default: 3
    },
    rowCount: {
      type: Number,
      required: true
    },
    rowHeight: {
      type: [Number, String, Function] as PropType<GridProps["rowHeight"]>,
      required: true
    },
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    tagName: {
      type: String,
      default: "div"
    }
  },
  setup(props, { slots, expose }) {
    const elementRef = ref<HTMLDivElement | null>(null);
    const isRtl = useIsRtl(elementRef, props.dir);

    const {
      getCellBounds: getColumnBounds,
      getEstimatedSize: getEstimatedWidth,
      startIndexOverscan: columnStartIndexOverscan,
      startIndexVisible: columnStartIndexVisible,
      scrollToIndex: scrollToColumnIndex,
      stopIndexOverscan: columnStopIndexOverscan,
      stopIndexVisible: columnStopIndexVisible
    } = useVirtualizer({
      containerElement: elementRef,
      containerStyle: toRef(props, "style"),
      defaultContainerSize: props.defaultWidth,
      direction: "horizontal",
      isRtl,
      itemCount: toRef(props, "columnCount"),
      itemProps: toRef(props, "cellProps"),
      itemSize: toRef(props, "columnWidth"),
      onResize: props.onResize,
      overscanCount: toRef(props, "overscanCount")
    });

    const {
      getCellBounds: getRowBounds,
      getEstimatedSize: getEstimatedHeight,
      startIndexOverscan: rowStartIndexOverscan,
      startIndexVisible: rowStartIndexVisible,
      scrollToIndex: scrollToRowIndex,
      stopIndexOverscan: rowStopIndexOverscan,
      stopIndexVisible: rowStopIndexVisible
    } = useVirtualizer({
      containerElement: elementRef,
      containerStyle: toRef(props, "style"),
      defaultContainerSize: props.defaultHeight,
      direction: "vertical",
      itemCount: toRef(props, "rowCount"),
      itemProps: toRef(props, "cellProps"),
      itemSize: toRef(props, "rowHeight"),
      onResize: props.onResize,
      overscanCount: toRef(props, "overscanCount")
    });

    const scrollToCell = ({
      behavior = "auto",
      columnAlign = "auto",
      columnIndex,
      rowAlign = "auto",
      rowIndex
    }: {
      behavior?: ScrollBehavior;
      columnAlign?: Align;
      columnIndex: number;
      rowAlign?: Align;
      rowIndex: number;
    }) => {
      const left = scrollToColumnIndex({
        align: columnAlign,
        containerScrollOffset: elementRef.value?.scrollLeft ?? 0,
        index: columnIndex
      });
      const top = scrollToRowIndex({
        align: rowAlign,
        containerScrollOffset: elementRef.value?.scrollTop ?? 0,
        index: rowIndex
      });
      if (elementRef.value && typeof elementRef.value.scrollTo === "function") {
        elementRef.value.scrollTo({
          behavior,
          left,
          top
        });
      }
    };

    const scrollToColumn = ({
      align = "auto",
      behavior = "auto",
      index
    }: {
      align?: Align;
      behavior?: ScrollBehavior;
      index: number;
    }) => {
      const left = scrollToColumnIndex({
        align,
        containerScrollOffset: elementRef.value?.scrollLeft ?? 0,
        index
      });
      if (elementRef.value && typeof elementRef.value.scrollTo === "function") {
        elementRef.value.scrollTo({
          behavior,
          left
        });
      }
    };

    const scrollToRow = ({
      align = "auto",
      behavior = "auto",
      index
    }: {
      align?: Align;
      behavior?: ScrollBehavior;
      index: number;
    }) => {
      const top = scrollToRowIndex({
        align,
        containerScrollOffset: elementRef.value?.scrollTop ?? 0,
        index
      });
      if (elementRef.value && typeof elementRef.value.scrollTo === "function") {
        elementRef.value.scrollTo({
          behavior,
          top
        });
      }
    };

    expose<GridImperativeAPI>({
      get element() {
        return elementRef.value;
      },
      scrollToCell,
      scrollToColumn,
      scrollToRow
    });

    watchEffect(() => {
      if (
        columnStartIndexOverscan.value >= 0 &&
        columnStopIndexOverscan.value >= 0 &&
        rowStartIndexOverscan.value >= 0 &&
        rowStopIndexOverscan.value >= 0 &&
        props.onCellsRendered
      ) {
        props.onCellsRendered(
          {
            columnStartIndex: columnStartIndexVisible.value,
            columnStopIndex: columnStopIndexVisible.value,
            rowStartIndex: rowStartIndexVisible.value,
            rowStopIndex: rowStopIndexVisible.value
          },
          {
            columnStartIndex: columnStartIndexOverscan.value,
            columnStopIndex: columnStopIndexOverscan.value,
            rowStartIndex: rowStartIndexOverscan.value,
            rowStopIndex: rowStopIndexOverscan.value
          }
        );
      }
    });

    const visibleRows = computed(() => {
      const indices: number[] = [];
      if (props.rowCount > 0 && props.columnCount > 0) {
        for (let index = rowStartIndexOverscan.value; index <= rowStopIndexOverscan.value; index++) {
          indices.push(index);
        }
      }
      return indices;
    });

    const getVisibleColumns = computed(() => {
      const indices: number[] = [];
      if (props.rowCount > 0 && props.columnCount > 0) {
        for (let index = columnStartIndexOverscan.value; index <= columnStopIndexOverscan.value; index++) {
          indices.push(index);
        }
      }
      return indices;
    });

    const getRowStyle = (_rowIndex: number) => {
      return {};
    };

    const getCellStyle = (rowIndex: number, columnIndex: number) => {
      const rowBounds = getRowBounds(rowIndex);
      const columnBounds = getColumnBounds(columnIndex);
      const rtl = unref(isRtl);
      return {
        position: "absolute",
        left: rtl ? undefined : 0,
        right: rtl ? 0 : undefined,
        top: 0,
        transform: `translate(${rtl ? -columnBounds.scrollOffset : columnBounds.scrollOffset}px, ${rowBounds.scrollOffset}px)`,
        height: `${rowBounds.size}px`,
        width: `${columnBounds.size}px`
      } as CSSProperties;
    };

    return () => {
      const Tag: any = props.tagName || "div";
      const CellComponent: any = props.cellComponent as any;
      return h(
        Tag,
        {
          ref: (el: any) => {
            elementRef.value = el as HTMLDivElement | null;
          },
          class: props.className,
          dir: props.dir as any,
          "aria-colcount": props.columnCount,
          "aria-rowcount": props.rowCount,
          role: "grid",
          style: {
            position: "relative",
            maxHeight: "100%",
            maxWidth: "100%",
            flexGrow: 1,
            overflow: "auto",
            ...(props.style || {})
          }
        },
        [
          ...visibleRows.value.map((rowIndex) =>
            h(
              "div",
              {
                key: `row-${rowIndex}`,
                role: "row",
                "aria-rowindex": rowIndex + 1,
                style: getRowStyle(rowIndex)
              },
              getVisibleColumns.value.map((columnIndex) =>
                h(CellComponent, {
                  ...(props.cellProps as any),
                  ariaAttributes: {
                    "aria-colindex": columnIndex + 1,
                    role: "gridcell"
                  },
                  columnIndex,
                  rowIndex,
                  style: getCellStyle(rowIndex, columnIndex),
                  key: `cell-${rowIndex}-${columnIndex}`
                })
              )
            )
          ),
          slots.default ? slots.default() : props.children,
          h("div", {
            "aria-hidden": "true",
            style: {
              height: `${getEstimatedHeight()}px`,
              width: `${getEstimatedWidth()}px`,
              zIndex: -1,
              pointerEvents: "none"
            }
          })
        ]
      );
    };
  }
});

