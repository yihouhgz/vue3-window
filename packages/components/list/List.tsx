import {
  computed,
  defineComponent,
  h,
  ref,
  toRef,
  watchEffect,
  type CSSProperties,
  type PropType,
  type VNode
} from 'vue'
import { useVirtualizer } from '../../core/useVirtualizer'
import { isDynamicRowHeight as isDynamicRowHeightUtil } from './isDynamicRowHeight'
import type { ListProps, ListImperativeAPI } from './types'
import type { Align } from '../../types'

export default defineComponent({
  name: 'List',
  props: {
    className: {
      type: String,
      default: undefined
    },
    defaultHeight: {
      type: Number,
      default: 0
    },
    onResize: {
      type: Function as PropType<ListProps['onResize']>,
      default: undefined
    },
    onRowsRendered: {
      type: Function as PropType<ListProps['onRowsRendered']>,
      default: undefined
    },
    overscanCount: {
      type: Number,
      default: 3
    },
    rowComponent: {
      type: Object as PropType<ListProps['rowComponent']>,
      required: true
    },
    rowCount: {
      type: Number,
      required: true
    },
    rowHeight: {
      type: [Number, String, Function, Object] as PropType<ListProps['rowHeight']>,
      required: true
    },
    rowProps: {
      type: Object as PropType<ListProps['rowProps']>,
      default: () => ({})
    },
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    tagName: {
      type: String,
      default: 'div'
    },
    children: {
      type: [Object, Array] as PropType<VNode | VNode[]>,
      required: false
    }
  },
  setup(props, { slots, expose }) {
    const elementRef = ref<HTMLElement | null>(null)

    const isDynamicRowHeight = computed(() => isDynamicRowHeightUtil(props.rowHeight))

    const rowHeight = computed(() => {
      if (isDynamicRowHeight.value) {
        return (index: number) => {
          // @ts-ignore
          return props.rowHeight.getRowHeight(index) ?? props.rowHeight.getAverageRowHeight()
        }
      }
      return props.rowHeight as number | string | ((index: number, rowProps: any) => number)
    })

    const {
      getCellBounds,
      getEstimatedSize,
      scrollToIndex,
      startIndexOverscan,
      startIndexVisible,
      stopIndexOverscan,
      stopIndexVisible
    } = useVirtualizer({
      containerElement: elementRef,
      containerStyle: toRef(props, 'style'),
      defaultContainerSize: props.defaultHeight,
      direction: 'vertical',
      itemCount: toRef(props, 'rowCount'),
      itemProps: toRef(props, 'rowProps'),
      itemSize: rowHeight,
      onResize: props.onResize,
      overscanCount: toRef(props, 'overscanCount')
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
      const top = scrollToIndex({
        align,
        containerScrollOffset: elementRef.value?.scrollTop ?? 0,
        index
      })

      if (elementRef.value && typeof elementRef.value.scrollTo === 'function') {
        elementRef.value.scrollTo({
          behavior,
          top
        })
      }
    }

    expose<ListImperativeAPI>({
      get element() {
        return elementRef.value
      },
      scrollToRow
    })

    watchEffect(() => {
      if (startIndexOverscan.value >= 0 && stopIndexOverscan.value >= 0 && props.onRowsRendered) {
        props.onRowsRendered(
          {
            startIndex: startIndexVisible.value,
            stopIndex: stopIndexVisible.value
          },
          {
            startIndex: startIndexOverscan.value,
            stopIndex: stopIndexOverscan.value
          }
        )
      }
    })

    // Handle dynamic row height observation
    watchEffect(
      (onCleanup) => {
        if (!elementRef.value || !isDynamicRowHeight.value) return
        const rows = Array.from(elementRef.value.children).filter((item) => {
          if ((item as Element).hasAttribute('aria-hidden')) return false
          return true
        })
        // @ts-ignore
        const cleanup = props.rowHeight.observeRowElements(rows)
        onCleanup(cleanup)
      },
      { flush: 'post' }
    )

    const visibleIndices = computed(() => {
      const indices: number[] = []
      if (props.rowCount > 0) {
        for (let index = startIndexOverscan.value; index <= stopIndexOverscan.value; index++) {
          indices.push(index)
        }
      }
      return indices
    })

    const getRowStyle = (index: number) => {
      const bounds = getCellBounds(index)
      return {
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `translateY(${bounds.scrollOffset}px)`,
        height: isDynamicRowHeight.value ? undefined : `${bounds.size}px`,
        width: '100%'
      } as CSSProperties
    }

    return () => {
      const Tag: any = props.tagName || 'div'
      const RowComponent: any = props.rowComponent as any
      return h(
        Tag,
        {
          ref: (el: any) => {
            elementRef.value = el as HTMLElement | null
          },
          class: props.className,
          style: {
            position: 'relative',
            maxHeight: '100%',
            flexGrow: 1,
            overflowY: 'auto',
            ...(props.style || {})
          }
        },
        [
          ...visibleIndices.value.map((index) =>
            h(RowComponent, {
              ...(props.rowProps as any),
              'aria-posinset': index + 1,
              'aria-setsize': props.rowCount,
              role: 'listitem',
              index,
              style: getRowStyle(index),
              'data-react-window-index': index,
              key: index
            })
          ),
          slots.default ? slots.default() : props.children,
          h('div', {
            'aria-hidden': 'true',
            style: {
              height: `${getEstimatedSize()}px`,
              width: '100%',
              zIndex: -1,
              pointerEvents: 'none'
            }
          })
        ]
      )
    }
  }
})
