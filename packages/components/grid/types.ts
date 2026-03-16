import type {
  Component,
  CSSProperties,
  HTMLAttributes,
  VNode
} from "vue";
import type { TagName } from "../../types";

export type GridProps<CellProps extends object = any> = {
  /**
   * Component responsible for rendering a cell.
   */
  cellComponent: Component<
    {
      ariaAttributes: {
        "aria-colindex": number;
        role: "gridcell";
      };
      columnIndex: number;
      rowIndex: number;
      style: CSSProperties;
    } & CellProps
  >;

  /**
   * Additional props to be passed to the cell-rendering component.
   */
  cellProps?: CellProps;

  /**
   * Additional content to be rendered within the grid (above cells).
   */
  children?: VNode | VNode[];

  /**
   * CSS class name.
   */
  className?: string;

  /**
   * Number of columns to be rendered in the grid.
   */
  columnCount: number;

  /**
   * Column width; the following formats are supported:
   * - number of pixels (number)
   * - percentage of the grid's current width (string)
   * - function that returns the column width (in pixels) given an index and `cellProps`
   */
  columnWidth:
    | number
    | string
    | ((index: number, cellProps: CellProps) => number);

  /**
   * Default height of grid for initial render.
   */
  defaultHeight?: number;

  /**
   * Default width of grid for initial render.
   */
  defaultWidth?: number;

  /**
   * Indicates the directionality of grid cells.
   */
  dir?: "ltr" | "rtl";

  /**
   * Callback notified when the range of rendered cells changes.
   */
  onCellsRendered?: (
    visibleCells: {
      columnStartIndex: number;
      columnStopIndex: number;
      rowStartIndex: number;
      rowStopIndex: number;
    },
    allCells: {
      columnStartIndex: number;
      columnStopIndex: number;
      rowStartIndex: number;
      rowStopIndex: number;
    }
  ) => void;

  /**
   * Callback notified when the Grid's outermost HTMLElement resizes.
   */
  onResize?: (
    size: { height: number; width: number },
    prevSize: { height: number; width: number }
  ) => void;

  /**
   * How many additional rows/columns to render outside of the visible area.
   */
  overscanCount?: number;

  /**
   * Number of rows to be rendered in the grid.
   */
  rowCount: number;

  /**
   * Row height; the following formats are supported:
   * - number of pixels (number)
   * - percentage of the grid's current height (string)
   * - function that returns the row height (in pixels) given an index and `cellProps`
   */
  rowHeight:
    | number
    | string
    | ((index: number, cellProps: CellProps) => number);

  /**
   * Optional CSS properties.
   */
  style?: CSSProperties;

  /**
   * Can be used to override the root HTML element rendered by the List component.
   */
  tagName?: TagName;
};

export interface GridImperativeAPI {
  element: HTMLDivElement | null;
  scrollToCell: (config: {
    behavior?: ScrollBehavior;
    columnAlign?: "auto" | "center" | "end" | "smart" | "start";
    columnIndex: number;
    rowAlign?: "auto" | "center" | "end" | "smart" | "start";
    rowIndex: number;
  }) => void;
  scrollToColumn: (config: {
    align?: "auto" | "center" | "end" | "smart" | "start";
    behavior?: ScrollBehavior;
    index: number;
  }) => void;
  scrollToRow: (config: {
    align?: "auto" | "center" | "end" | "smart" | "start";
    behavior?: ScrollBehavior;
    index: number;
  }) => void;
}
