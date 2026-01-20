import type { CSSProperties } from "vue";
import type { TagNames } from "../../types";

type ForbiddenKeys = "ariaAttributes" | "columnIndex" | "rowIndex" | "style";
type ExcludeForbiddenKeys<Type> = { [Key in keyof Type]: Key extends ForbiddenKeys ? never : Type[Key] };

export type GridProps<CellProps extends object, TagName extends TagNames = "div"> = {
  cellComponent: (props: { ariaAttributes: { "aria-colindex": number; role: "gridcell" }; columnIndex: number; rowIndex: number; style: CSSProperties } & CellProps) => any;
  cellProps: ExcludeForbiddenKeys<CellProps>;
  children?: any;
  className?: string;
  columnCount: number;
  columnWidth: number | string | ((index: number, cellProps: CellProps) => number);
  defaultHeight?: number;
  defaultWidth?: number;
  dir?: "ltr" | "rtl";
  gridRef?: any;
  onCellsRendered?: (visibleCells: { columnStartIndex: number; columnStopIndex: number; rowStartIndex: number; rowStopIndex: number }, allCells: { columnStartIndex: number; columnStopIndex: number; rowStartIndex: number; rowStopIndex: number }) => void;
  onResize?: (size: { height: number; width: number }, prevSize: { height: number; width: number }) => void;
  overscanCount?: number;
  rowCount: number;
  rowHeight: number | string | ((index: number, cellProps: CellProps) => number);
  style?: CSSProperties;
  tagName?: TagName;
};

export type CellComponent<CellProps extends object> = GridProps<CellProps>["cellComponent"];
export type CellComponentProps<CellProps extends object = object> = Parameters<CellComponent<CellProps>>[0];
export type ScrollState = { prevScrollTop: number; scrollTop: number };
export type OnCellsRendered = NonNullable<GridProps<object>["onCellsRendered"]>;
export type CachedBounds = Map<number, { height: number; scrollTop: number }>; 

export interface GridImperativeAPI {
  get element(): HTMLDivElement | null;
  scrollToCell: ({ behavior, columnAlign, columnIndex, rowAlign, rowIndex }: { behavior?: "auto" | "instant" | "smooth"; columnAlign?: "auto" | "center" | "end" | "smart" | "start"; columnIndex: number; rowAlign?: "auto" | "center" | "end" | "smart" | "start"; rowIndex: number }) => void;
  scrollToColumn: ({ align, behavior, index }: { align?: "auto" | "center" | "end" | "smart" | "start"; behavior?: "auto" | "instant" | "smooth"; index: number }) => void;
  scrollToRow: ({ align, behavior, index }: { align?: "auto" | "center" | "end" | "smart" | "start"; behavior?: "auto" | "instant" | "smooth"; index: number }) => void;
}
