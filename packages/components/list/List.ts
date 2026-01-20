import { h, defineComponent, ref, watchEffect, onMounted, PropType } from 'vue'
import { useVirtualizer } from '../../core/useVirtualizer'
import type { Align } from '../../types'
import type { ListProps } from './types'
import { isDynamicRowHeight as isDynamicRowHeightUtil } from './isDynamicRowHeight'

export const DATA_ATTRIBUTE_LIST_INDEX = 'data-react-window-index'

export const List = defineComponent({
  name: 'List',
  props: {
    children: { type: null },
    className: { type: String },
    defaultHeight: { type: Number, default: 0 },
    listRef: { type: Object as PropType<any> },
    onResize: { type: Function as PropType<NonNullable<ListProps<object>['onResize']>> },
    onRowsRendered: {
      type: Function as PropType<NonNullable<ListProps<object>['onRowsRendered']>>
    },
    overscanCount: { type: Number, default: 3 },
    rowComponent: { type: Function as PropType<ListProps<object>['rowComponent']>, required: true },
    rowCount: { type: Number, required: true },
    rowHeight: {
      type: [Number, String, Function, Object] as PropType<ListProps<object>['rowHeight']>,
      required: true
    },
    rowProps: { type: Object as PropType<ListProps<object>['rowProps']>, default: () => ({}) },
    tagName: { type: String as PropType<ListProps<object>['tagName']>, default: 'div' },
    style: { type: Object as PropType<any> }
  },
  setup(props, { expose, slots, attrs }) {
    const elementRef = ref<HTMLDivElement | null>(null)
    const isDynamicRowHeight = isDynamicRowHeightUtil(props.rowHeight)
    const rowHeight = isDynamicRowHeight
      ? (index: number) =>
          (props.rowHeight as any).getRowHeight(index) ??
          (props.rowHeight as any).getAverageRowHeight()
      : (props.rowHeight as any)
    const {
      getCellBounds,
      getEstimatedSize,
      scrollToIndex,
      startIndexOverscan,
      startIndexVisible,
      stopIndexOverscan,
      stopIndexVisible
    } = useVirtualizer({
      containerElementRef: elementRef,
      containerStyle: props.style,
      defaultContainerSize: props.defaultHeight,
      direction: 'vertical',
      itemCount: props.rowCount,
      itemProps: props.rowProps,
      itemSize: rowHeight,
      overscanCount: props.overscanCount
    })
    const scrollToRow = ({
      align = 'auto',
      behavior = 'auto',
      index
    }: {
      align?: Align
      behavior?: ScrollBehavior
      index: number
    }) => {
      const top = scrollToIndex({ align, index })
      const el = elementRef.value
      if (el && typeof el.scrollTo === 'function') el.scrollTo({ behavior, top })
    }
    expose({ element: elementRef, scrollToRow })
    onMounted(() => {
      const el = elementRef.value
      if (!el) return
      const children = Array.from(el.children).filter((item) => !item.hasAttribute('aria-hidden'))
      children.forEach((item, i) =>
        item.setAttribute(DATA_ATTRIBUTE_LIST_INDEX, `${startIndexOverscan.value + i}`)
      )
      if (isDynamicRowHeight) (props.rowHeight as any).observeRowElements(children as Element[])
    })
    watchEffect(() => {
      if (startIndexOverscan.value >= 0 && stopIndexOverscan.value >= 0 && props.onRowsRendered) {
        props.onRowsRendered(
          { startIndex: startIndexVisible.value, stopIndex: stopIndexVisible.value },
          { startIndex: startIndexOverscan.value, stopIndex: stopIndexOverscan.value }
        )
      }
    })
    return () => {
      const Row = props.rowComponent as any
      const childrenNodes: any[] = []
      if (props.rowCount > 0) {
        for (let index = startIndexOverscan.value; index <= stopIndexOverscan.value; index++) {
          const bounds = getCellBounds(index)
          childrenNodes.push(
            Row({
              ...(props.rowProps as any),
              ariaAttributes: {
                'aria-posinset': index + 1,
                'aria-setsize': props.rowCount,
                role: 'listitem'
              },
              index,
              style: {
                position: 'absolute',
                left: 0,
                transform: `translateY(${bounds.scrollOffset}px)`,
                height: isDynamicRowHeight ? undefined : bounds.size,
                width: '100%'
              }
            })
          )
        }
      }
      const sizingElement = h('div', {
        ariaHidden: true,
        style: { height: getEstimatedSize(), width: '100%', zIndex: -1 }
      })
      return h(
        props.tagName as any,
        {
          role: 'list',
          ref: elementRef,
          class: props.className,
          style: {
            position: 'relative',
            maxHeight: '100%',
            flexGrow: 1,
            overflowY: 'auto',
            ...(props.style as any)
          },
          ...attrs
        },
        [childrenNodes, slots.default ? slots.default() : null, sizingElement]
      )
    }
  }
})
