import { h, defineComponent, ref, onMounted, PropType } from "vue";
import { createCachedBounds } from "../../core/createCachedBounds";
import { getEstimatedSize } from "../../core/getEstimatedSize";
import { getStartStopIndices } from "../../core/getStartStopIndices";
import { getOffsetForIndex } from "../../core/getOffsetForIndex";
import { useResizeObserver } from "../../hooks/useResizeObserver";
import type { GridProps } from "./types";

export const Grid = defineComponent({
  name: "Grid",
  props: {
    cellComponent: { type: Function as PropType<GridProps<object>["cellComponent"]>, required: true },
    cellProps: { type: Object as PropType<GridProps<object>["cellProps"]>, default: () => ({}) },
    children: { type: null },
    className: { type: String },
    columnCount: { type: Number, required: true },
    columnWidth: { type: [Number, String, Function] as PropType<GridProps<object>["columnWidth"]>, required: true },
    defaultHeight: { type: Number, default: 0 },
    defaultWidth: { type: Number, default: 0 },
    dir: { type: String as PropType<"ltr" | "rtl">, default: "ltr" },
    gridRef: { type: Object as PropType<any> },
    onCellsRendered: { type: Function as PropType<NonNullable<GridProps<object>["onCellsRendered"]>> },
    onResize: { type: Function as PropType<NonNullable<GridProps<object>["onResize"]>> },
    overscanCount: { type: Number, default: 3 },
    rowCount: { type: Number, required: true },
    rowHeight: { type: [Number, String, Function] as PropType<GridProps<object>["rowHeight"]>, required: true },
    style: { type: Object as PropType<any> },
    tagName: { type: String as PropType<GridProps<object>["tagName"]>, default: "div" }
  },
  setup(props, { expose, attrs }) {
    const elementRef = ref<HTMLDivElement | null>(null);
    const { height, width } = useResizeObserver({ elementRef, defaultHeight: props.defaultHeight, defaultWidth: props.defaultWidth, mode: "both" });
    const rowItemSize = typeof props.rowHeight === "function" ? (i: number) => (props.rowHeight as any)(i, props.cellProps) : props.rowHeight as number;
    const colItemSize = typeof props.columnWidth === "function" ? (i: number) => (props.columnWidth as any)(i, props.cellProps) : props.columnWidth as number;
    const rowBounds = createCachedBounds({ itemCount: props.rowCount, itemProps: props.cellProps, itemSize: rowItemSize });
    const colBounds = createCachedBounds({ itemCount: props.columnCount, itemProps: props.cellProps, itemSize: colItemSize });
    let rowIndices = getStartStopIndices({ cachedBounds: rowBounds, containerScrollOffset: 0, containerSize: props.defaultHeight, itemCount: props.rowCount, overscanCount: props.overscanCount });
    let colIndices = getStartStopIndices({ cachedBounds: colBounds, containerScrollOffset: 0, containerSize: props.defaultWidth, itemCount: props.columnCount, overscanCount: props.overscanCount });
    const scrollToCell = ({ rowIndex, columnIndex, align = "auto" }: { rowIndex: number; columnIndex: number; align?: "auto" | "center" | "end" | "smart" | "start" }) => {
      const el = elementRef.value;
      const top = getOffsetForIndex({ align, cachedBounds: rowBounds, containerScrollOffset: el?.scrollTop ?? 0, containerSize: height.value, index: rowIndex, itemCount: props.rowCount, itemSize: rowItemSize });
      const left = getOffsetForIndex({ align, cachedBounds: colBounds, containerScrollOffset: el?.scrollLeft ?? 0, containerSize: width.value, index: columnIndex, itemCount: props.columnCount, itemSize: colItemSize });
      if (el && typeof el.scrollTo === "function") el.scrollTo({ top, left });
      return { top, left };
    };
    const scrollToRow = ({ align = "auto", behavior = "auto", index }: { align?: "auto" | "center" | "end" | "smart" | "start"; behavior?: ScrollBehavior; index: number }) => {
      const el = elementRef.value;
      const top = getOffsetForIndex({ align, cachedBounds: rowBounds, containerScrollOffset: el?.scrollTop ?? 0, containerSize: height.value, index, itemCount: props.rowCount, itemSize: rowItemSize });
      if (el && typeof el.scrollTo === "function") el.scrollTo({ behavior, top });
    };
    const scrollToColumn = ({ align = "auto", behavior = "auto", index }: { align?: "auto" | "center" | "end" | "smart" | "start"; behavior?: ScrollBehavior; index: number }) => {
      const el = elementRef.value;
      const left = getOffsetForIndex({ align, cachedBounds: colBounds, containerScrollOffset: el?.scrollLeft ?? 0, containerSize: width.value, index, itemCount: props.columnCount, itemSize: colItemSize });
      if (el && typeof el.scrollTo === "function") el.scrollTo({ behavior, left });
    };
    onMounted(() => {
      const el = elementRef.value;
      if (!el) return;
      const onScroll = () => {
        const nextRows = getStartStopIndices({ cachedBounds: rowBounds, containerScrollOffset: el.scrollTop, containerSize: height.value, itemCount: props.rowCount, overscanCount: props.overscanCount });
        const nextCols = getStartStopIndices({ cachedBounds: colBounds, containerScrollOffset: el.scrollLeft, containerSize: width.value, itemCount: props.columnCount, overscanCount: props.overscanCount });
        rowIndices = nextRows;
        colIndices = nextCols;
        if (props.onCellsRendered) props.onCellsRendered({ columnStartIndex: nextCols.startIndexVisible, columnStopIndex: nextCols.stopIndexVisible, rowStartIndex: nextRows.startIndexVisible, rowStopIndex: nextRows.stopIndexVisible }, { columnStartIndex: nextCols.startIndexOverscan, columnStopIndex: nextCols.stopIndexOverscan, rowStartIndex: nextRows.startIndexOverscan, rowStopIndex: nextRows.stopIndexOverscan });
      };
      el.addEventListener("scroll", onScroll);
    });
    const imperative = { get element() { return elementRef.value }, scrollToCell, scrollToColumn, scrollToRow };
    if (props.gridRef && typeof props.gridRef === "object") (props.gridRef as any).value = imperative;
    else if (typeof props.gridRef === "function") (props.gridRef as any)(imperative);
    return () => {
      const Cell = props.cellComponent as any;
      const childrenNodes: any[] = [];
      const startRow = Math.min(props.rowCount - 1, rowIndices.startIndexOverscan);
      const stopRow = Math.min(props.rowCount - 1, rowIndices.stopIndexOverscan);
      const startCol = Math.min(props.columnCount - 1, colIndices.startIndexOverscan);
      const stopCol = Math.min(props.columnCount - 1, colIndices.stopIndexOverscan);
      for (let r = startRow; r <= stopRow; r++) {
        const rb = rowBounds.get(r);
        for (let c = startCol; c <= stopCol; c++) {
          const cb = colBounds.get(c);
          childrenNodes.push(Cell({ ...(props.cellProps as any), ariaAttributes: { "aria-colindex": c + 1, role: "gridcell" }, rowIndex: r, columnIndex: c, style: { position: "absolute", transform: `translate(${cb.scrollOffset}px, ${rb.scrollOffset}px)`, height: rb.size, width: cb.size } }));
        }
      }
      const sizingElement = h("div", { ariaHidden: true, style: { height: getEstimatedSize({ cachedBounds: rowBounds, itemCount: props.rowCount, itemSize: rowItemSize }), width: getEstimatedSize({ cachedBounds: colBounds, itemCount: props.columnCount, itemSize: colItemSize }), zIndex: -1 } });
      return h(props.tagName as any, { role: "grid", ref: elementRef, class: props.className, style: { position: "relative", overflow: "auto", ...(props.style as any) }, ...attrs }, [childrenNodes, sizingElement]);
    };
  }
});
