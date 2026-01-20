let cached = -1
export function getScrollbarSize() {
  if (cached >= 0) return cached
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  //@ts-ignore
  outer.style['msOverflowStyle'] = 'scrollbar'
  document.body.appendChild(outer)
  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'
  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)
  const widthWithScroll = inner.offsetWidth
  outer.parentNode?.removeChild(outer)
  cached = widthNoScroll - widthWithScroll
  return cached
}
