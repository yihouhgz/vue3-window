import type {
  Component,
  CSSProperties,
  HTMLAttributes,
  Ref,
  VNode
} from "vue";
import type { TagName } from "../../types";

export type DynamicRowHeight = {
  getAverageRowHeight(): number;
  getRowHeight(index: number): number | undefined;
  setRowHeight(index: number, size: number): void;
  observeRowElements: (elements: Element[] | NodeListOf<Element>) => () => void;
};

export type ListProps<RowProps extends object = any> = {
  /**
   * Additional content to be rendered within the list (above cells).
   * This property can be used to render things like overlays or tooltips.
   */
  children?: VNode | VNode[];

  /**
   * CSS class name.
   */
  className?: string;

  /**
   * Default height of list for initial render.
   * This value is important for server rendering.
   */
  defaultHeight?: number;

  /**
   * Callback notified when the List's outermost HTMLElement resizes.
   * This may be used to (re)scroll a row into view.
   */
  onResize?: (
    size: { height: number; width: number },
    prevSize: { height: number; width: number }
  ) => void;

  /**
   * Callback notified when the range of visible rows changes.
   */
  onRowsRendered?: (
    visibleRows: { startIndex: number; stopIndex: number },
    allRows: { startIndex: number; stopIndex: number }
  ) => void;

  /**
   * How many additional rows to render outside of the visible area.
   * This can reduce visual flickering near the edges of a list when scrolling.
   */
  overscanCount?: number;

  /**
   * Component responsible for rendering a row.
   */
  rowComponent: Component<
    {
      ariaAttributes: {
        "aria-posinset": number;
        "aria-setsize": number;
        role: "listitem";
      };
      index: number;
      style: CSSProperties;
    } & RowProps
  >;

  /**
   * Number of items to be rendered in the list.
   */
  rowCount: number;

  /**
   * Row height; the following formats are supported:
   * - number of pixels (number)
   * - percentage of the grid's current height (string)
   * - function that returns the row height (in pixels) given an index and `cellProps`
   * - dynamic row height cache returned by the `useDynamicRowHeight` hook
   */
  rowHeight:
    | number
    | string
    | ((index: number, cellProps: RowProps) => number)
    | DynamicRowHeight;

  /**
   * Additional props to be passed to the row-rendering component.
   */
  rowProps?: RowProps;

  /**
   * Optional CSS properties.
   * The list of rows will fill the height defined by this style.
   */
  style?: CSSProperties;

  /**
   * Can be used to override the root HTML element rendered by the List component.
   * The default value is "div".
   */
  tagName?: TagName;
};

export type ListImperativeAPI = {
  element: HTMLElement | null;
  scrollToRow: (config: {
    align?: "auto" | "center" | "end" | "smart" | "start";
    behavior?: ScrollBehavior;
    index: number;
  }) => void;
};
