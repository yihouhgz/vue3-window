import { ref as I, onMounted as F, onBeforeUnmount as L, defineComponent as W, h as M, computed as T, watchEffect as $ } from "vue";
function A({
  itemCount: e,
  itemProps: d,
  itemSize: s
}) {
  const l = /* @__PURE__ */ new Map();
  return {
    get(n) {
      if (n >= e) throw new RangeError(`Invalid index ${n}`);
      for (; l.size - 1 < n; ) {
        const i = l.size;
        let a;
        if (typeof s == "function" ? a = s(i, d) : a = s, i === 0) l.set(i, { size: a, scrollOffset: 0 });
        else {
          const t = l.get(i - 1);
          if (!t) throw new Error(`Bounds miss for ${n}`);
          l.set(i, { size: a, scrollOffset: t.scrollOffset + t.size });
        }
      }
      const u = l.get(n);
      if (!u) throw new Error(`Bounds miss for ${n}`);
      return u;
    },
    set(n, u) {
      l.set(n, u);
    },
    get size() {
      return l.size;
    }
  };
}
function V({
  cachedBounds: e,
  itemCount: d,
  itemSize: s
}) {
  if (d === 0) return 0;
  if (typeof s == "number") return d * s;
  const l = e.get(e.size === 0 ? 0 : e.size - 1), n = (l.scrollOffset + l.size) / e.size;
  return d * n;
}
function R({
  cachedBounds: e,
  containerScrollOffset: d,
  containerSize: s,
  itemCount: l,
  overscanCount: n
}) {
  const u = l - 1;
  let i = 0, a = -1, t = 0, o = -1, c = 0;
  for (; c < u; ) {
    const v = e.get(c);
    if (v.scrollOffset + v.size > d) break;
    c++;
  }
  for (i = c, t = Math.max(0, i - n); c < u; ) {
    const v = e.get(c);
    if (v.scrollOffset + v.size >= d + s) break;
    c++;
  }
  return a = Math.min(u, c), o = Math.min(l - 1, a + n), i < 0 && (i = 0, a = -1, t = 0, o = -1), { startIndexVisible: i, stopIndexVisible: a, startIndexOverscan: t, stopIndexOverscan: o };
}
function N({
  align: e,
  cachedBounds: d,
  index: s,
  itemCount: l,
  itemSize: n,
  containerScrollOffset: u,
  containerSize: i
}) {
  if (s < 0 || s >= l) throw new RangeError(`Invalid index ${s}`);
  const a = V({ cachedBounds: d, itemCount: l, itemSize: n }), t = d.get(s), o = Math.max(0, Math.min(a - i, t.scrollOffset)), c = Math.max(0, t.scrollOffset - i + t.size);
  switch (e === "smart" && (u >= c && u <= o ? e = "auto" : e = "center"), e) {
    case "start":
      return o;
    case "end":
      return c;
    case "center":
      return t.scrollOffset <= i / 2 ? 0 : t.scrollOffset + t.size / 2 >= a - i / 2 ? a - i : t.scrollOffset + t.size / 2 - i / 2;
    case "auto":
    default:
      return u >= c && u <= o ? u : u < c ? c : o;
  }
}
function p({
  elementRef: e,
  defaultHeight: d = 0,
  defaultWidth: s = 0,
  mode: l = "both"
}) {
  const n = I(d), u = I(s);
  let i;
  return F(() => {
    const a = e.value;
    if (!a) return;
    const t = (o) => {
      (l === "only-height" || l === "both") && (n.value = Math.round(o.height)), (l === "only-width" || l === "both") && (u.value = Math.round(o.width));
    };
    t(a.getBoundingClientRect()), i = new ResizeObserver((o) => {
      for (const c of o) t(c.contentRect);
    }), i.observe(a);
  }), L(() => {
    i == null || i.disconnect();
  }), { height: n, width: u };
}
const D = W({
  name: "Grid",
  props: {
    cellComponent: { type: Function, required: !0 },
    cellProps: { type: Object, default: () => ({}) },
    children: { type: null },
    className: { type: String },
    columnCount: { type: Number, required: !0 },
    columnWidth: { type: [Number, String, Function], required: !0 },
    defaultHeight: { type: Number, default: 0 },
    defaultWidth: { type: Number, default: 0 },
    dir: { type: String, default: "ltr" },
    gridRef: { type: Object },
    onCellsRendered: { type: Function },
    onResize: { type: Function },
    overscanCount: { type: Number, default: 3 },
    rowCount: { type: Number, required: !0 },
    rowHeight: { type: [Number, String, Function], required: !0 },
    style: { type: Object },
    tagName: { type: String, default: "div" }
  },
  setup(e, { expose: d, attrs: s }) {
    const l = I(null), { height: n, width: u } = p({ elementRef: l, defaultHeight: e.defaultHeight, defaultWidth: e.defaultWidth, mode: "both" }), i = typeof e.rowHeight == "function" ? (f) => e.rowHeight(f, e.cellProps) : e.rowHeight, a = typeof e.columnWidth == "function" ? (f) => e.columnWidth(f, e.cellProps) : e.columnWidth, t = A({ itemCount: e.rowCount, itemProps: e.cellProps, itemSize: i }), o = A({ itemCount: e.columnCount, itemProps: e.cellProps, itemSize: a });
    let c = R({ cachedBounds: t, containerScrollOffset: 0, containerSize: e.defaultHeight, itemCount: e.rowCount, overscanCount: e.overscanCount }), v = R({ cachedBounds: o, containerScrollOffset: 0, containerSize: e.defaultWidth, itemCount: e.columnCount, overscanCount: e.overscanCount });
    const g = ({ rowIndex: f, columnIndex: m, align: h = "auto" }) => {
      const r = l.value, S = N({ align: h, cachedBounds: t, containerScrollOffset: (r == null ? void 0 : r.scrollTop) ?? 0, containerSize: n.value, index: f, itemCount: e.rowCount, itemSize: i }), w = N({ align: h, cachedBounds: o, containerScrollOffset: (r == null ? void 0 : r.scrollLeft) ?? 0, containerSize: u.value, index: m, itemCount: e.columnCount, itemSize: a });
      return r && typeof r.scrollTo == "function" && r.scrollTo({ top: S, left: w }), { top: S, left: w };
    }, z = ({ align: f = "auto", behavior: m = "auto", index: h }) => {
      const r = l.value, S = N({ align: f, cachedBounds: t, containerScrollOffset: (r == null ? void 0 : r.scrollTop) ?? 0, containerSize: n.value, index: h, itemCount: e.rowCount, itemSize: i });
      r && typeof r.scrollTo == "function" && r.scrollTo({ behavior: m, top: S });
    }, O = ({ align: f = "auto", behavior: m = "auto", index: h }) => {
      const r = l.value, S = N({ align: f, cachedBounds: o, containerScrollOffset: (r == null ? void 0 : r.scrollLeft) ?? 0, containerSize: u.value, index: h, itemCount: e.columnCount, itemSize: a });
      r && typeof r.scrollTo == "function" && r.scrollTo({ behavior: m, left: S });
    };
    F(() => {
      const f = l.value;
      if (!f) return;
      const m = () => {
        const h = R({ cachedBounds: t, containerScrollOffset: f.scrollTop, containerSize: n.value, itemCount: e.rowCount, overscanCount: e.overscanCount }), r = R({ cachedBounds: o, containerScrollOffset: f.scrollLeft, containerSize: u.value, itemCount: e.columnCount, overscanCount: e.overscanCount });
        c = h, v = r, e.onCellsRendered && e.onCellsRendered({ columnStartIndex: r.startIndexVisible, columnStopIndex: r.stopIndexVisible, rowStartIndex: h.startIndexVisible, rowStopIndex: h.stopIndexVisible }, { columnStartIndex: r.startIndexOverscan, columnStopIndex: r.stopIndexOverscan, rowStartIndex: h.startIndexOverscan, rowStopIndex: h.stopIndexOverscan });
      };
      f.addEventListener("scroll", m);
    });
    const x = { get element() {
      return l.value;
    }, scrollToCell: g, scrollToColumn: O, scrollToRow: z };
    return e.gridRef && typeof e.gridRef == "object" ? e.gridRef.value = x : typeof e.gridRef == "function" && e.gridRef(x), () => {
      const f = e.cellComponent, m = [], h = Math.min(e.rowCount - 1, c.startIndexOverscan), r = Math.min(e.rowCount - 1, c.stopIndexOverscan), S = Math.min(e.columnCount - 1, v.startIndexOverscan), w = Math.min(e.columnCount - 1, v.stopIndexOverscan);
      for (let y = h; y <= r; y++) {
        const H = t.get(y);
        for (let b = S; b <= w; b++) {
          const C = o.get(b);
          m.push(f({ ...e.cellProps, ariaAttributes: { "aria-colindex": b + 1, role: "gridcell" }, rowIndex: y, columnIndex: b, style: { position: "absolute", transform: `translate(${C.scrollOffset}px, ${H.scrollOffset}px)`, height: H.size, width: C.size } }));
        }
      }
      const E = M("div", { ariaHidden: !0, style: { height: V({ cachedBounds: t, itemCount: e.rowCount, itemSize: i }), width: V({ cachedBounds: o, itemCount: e.columnCount, itemSize: a }), zIndex: -1 } });
      return M(e.tagName, { role: "grid", ref: l, class: e.className, style: { position: "relative", overflow: "auto", ...e.style }, ...s }, [m, E]);
    };
  }
});
function G() {
  const e = I(null);
  return [e, (s) => {
    e.value = s;
  }];
}
function _() {
  return I(null);
}
function j({
  containerElementRef: e,
  containerStyle: d,
  defaultContainerSize: s = 0,
  direction: l,
  itemCount: n,
  itemProps: u,
  itemSize: i,
  overscanCount: a
}) {
  const { height: t } = p({
    elementRef: e,
    defaultHeight: s,
    defaultWidth: 0,
    mode: "only-height"
  }), o = T(() => t.value), c = typeof i == "string" ? o.value * parseFloat(i) / 100 : i, v = T(
    () => A({ itemCount: n, itemProps: u, itemSize: c })
  ), g = I(
    R({
      cachedBounds: v.value,
      containerScrollOffset: 0,
      containerSize: o.value,
      itemCount: n,
      overscanCount: a
    })
  ), z = T(() => Math.min(n - 1, g.value.startIndexVisible)), O = T(() => Math.min(n - 1, g.value.stopIndexVisible)), x = T(
    () => Math.min(n - 1, g.value.startIndexOverscan)
  ), f = T(() => Math.min(n - 1, g.value.stopIndexOverscan)), m = (w) => v.value.get(w), h = () => V({ cachedBounds: v.value, itemCount: n, itemSize: c }), r = (w) => R({
    cachedBounds: v.value,
    containerScrollOffset: w,
    containerSize: o.value,
    itemCount: n,
    overscanCount: a
  });
  return F(() => {
    const w = e.value, E = (w == null ? void 0 : w.scrollTop) ?? 0;
    if (g.value = r(E), !w) return;
    const y = () => {
      const H = w.scrollTop, b = R({
        cachedBounds: v.value,
        containerScrollOffset: H,
        containerSize: o.value,
        itemCount: n,
        overscanCount: a
      }), C = g.value;
      C.startIndexVisible === b.startIndexVisible && C.stopIndexVisible === b.stopIndexVisible && C.startIndexOverscan === b.startIndexOverscan && C.stopIndexOverscan === b.stopIndexOverscan || (g.value = b);
    };
    w.addEventListener("scroll", y);
  }), {
    getCellBounds: m,
    getEstimatedSize: h,
    scrollToIndex: ({
      align: w = "auto",
      index: E
    }) => {
      const y = e.value, H = (y == null ? void 0 : y.scrollTop) ?? 0, b = N({
        align: w,
        cachedBounds: v.value,
        containerScrollOffset: H,
        containerSize: o.value,
        index: E,
        itemCount: n,
        itemSize: c
      });
      if (y)
        return y.scrollTo({ top: b }), b;
    },
    startIndexOverscan: x,
    startIndexVisible: z,
    stopIndexOverscan: f,
    stopIndexVisible: O
  };
}
function q(e) {
  if (!e || typeof e != "object") return !1;
  const d = e;
  return typeof d.getAverageRowHeight == "function" && typeof d.getRowHeight == "function" && typeof d.setRowHeight == "function" && typeof d.observeRowElements == "function";
}
const P = "data-react-window-index", U = W({
  name: "List",
  props: {
    children: { type: null },
    className: { type: String },
    defaultHeight: { type: Number, default: 0 },
    listRef: { type: Object },
    onResize: { type: Function },
    onRowsRendered: {
      type: Function
    },
    overscanCount: { type: Number, default: 3 },
    rowComponent: { type: Function, required: !0 },
    rowCount: { type: Number, required: !0 },
    rowHeight: {
      type: [Number, String, Function, Object],
      required: !0
    },
    rowProps: { type: Object, default: () => ({}) },
    tagName: { type: String, default: "div" },
    style: { type: Object }
  },
  setup(e, { expose: d, slots: s, attrs: l }) {
    const n = I(null), u = q(e.rowHeight), i = u ? (x) => e.rowHeight.getRowHeight(x) ?? e.rowHeight.getAverageRowHeight() : e.rowHeight, {
      getCellBounds: a,
      getEstimatedSize: t,
      scrollToIndex: o,
      startIndexOverscan: c,
      startIndexVisible: v,
      stopIndexOverscan: g,
      stopIndexVisible: z
    } = j({
      containerElementRef: n,
      containerStyle: e.style,
      defaultContainerSize: e.defaultHeight,
      direction: "vertical",
      itemCount: e.rowCount,
      itemProps: e.rowProps,
      itemSize: i,
      overscanCount: e.overscanCount
    });
    return d({ element: n, scrollToRow: ({
      align: x = "auto",
      behavior: f = "auto",
      index: m
    }) => {
      const h = o({ align: x, index: m }), r = n.value;
      r && typeof r.scrollTo == "function" && r.scrollTo({ behavior: f, top: h });
    } }), F(() => {
      const x = n.value;
      if (!x) return;
      const f = Array.from(x.children).filter((m) => !m.hasAttribute("aria-hidden"));
      f.forEach(
        (m, h) => m.setAttribute(P, `${c.value + h}`)
      ), u && e.rowHeight.observeRowElements(f);
    }), $(() => {
      c.value >= 0 && g.value >= 0 && e.onRowsRendered && e.onRowsRendered(
        { startIndex: v.value, stopIndex: z.value },
        { startIndex: c.value, stopIndex: g.value }
      );
    }), () => {
      const x = e.rowComponent, f = [];
      if (e.rowCount > 0)
        for (let h = c.value; h <= g.value; h++) {
          const r = a(h);
          f.push(
            x({
              ...e.rowProps,
              ariaAttributes: {
                "aria-posinset": h + 1,
                "aria-setsize": e.rowCount,
                role: "listitem"
              },
              index: h,
              style: {
                position: "absolute",
                left: 0,
                transform: `translateY(${r.scrollOffset}px)`,
                height: u ? void 0 : r.size,
                width: "100%"
              }
            })
          );
        }
      const m = M("div", {
        ariaHidden: !0,
        style: { height: t(), width: "100%", zIndex: -1 }
      });
      return M(
        e.tagName,
        {
          role: "list",
          ref: n,
          class: e.className,
          style: {
            position: "relative",
            maxHeight: "100%",
            flexGrow: 1,
            overflowY: "auto",
            ...e.style
          },
          ...l
        },
        [f, s.default ? s.default() : null, m]
      );
    };
  }
});
function Y({
  defaultRowHeight: e,
  key: d
}) {
  const s = I(/* @__PURE__ */ new Map()), l = () => {
    let t = 0;
    return s.value.forEach((o) => t += o), t === 0 ? e : t / s.value.size;
  }, n = (t) => {
    const o = s.value.get(t);
    return o !== void 0 ? o : (s.value.set(t, e), e);
  }, u = (t, o) => {
    if (s.value.get(t) === o) return;
    const c = new Map(s.value);
    c.set(t, o), s.value = c;
  }, i = new ResizeObserver((t) => {
    t.length !== 0 && t.forEach((o) => {
      var O;
      const c = o.target.getAttribute(P);
      if (c === null)
        throw new Error(`Invalid ${P} attribute value`);
      const v = parseInt(c), g = (O = o.borderBoxSize) == null ? void 0 : O[0], z = (g == null ? void 0 : g.blockSize) || o.contentRect.height;
      z && u(v, z);
    });
  });
  return { getAverageRowHeight: l, getRowHeight: n, setRowHeight: u, observeRowElements: (t) => (t.forEach((o) => i.observe(o)), () => {
    t.forEach((o) => i.unobserve(o));
  }) };
}
function X() {
  const e = I(null);
  return [e, (s) => {
    e.value = s;
  }];
}
function J() {
  return I(null);
}
let B = -1;
function K() {
  var n;
  if (B >= 0) return B;
  const e = document.createElement("div");
  e.style.visibility = "hidden", e.style.width = "100px", e.style.msOverflowStyle = "scrollbar", document.body.appendChild(e);
  const d = e.offsetWidth;
  e.style.overflow = "scroll";
  const s = document.createElement("div");
  s.style.width = "100%", e.appendChild(s);
  const l = s.offsetWidth;
  return (n = e.parentNode) == null || n.removeChild(e), B = d - l, B;
}
export {
  D as Grid,
  U as List,
  K as getScrollbarSize,
  Y as useDynamicRowHeight,
  G as useGridCallbackRef,
  _ as useGridRef,
  X as useListCallbackRef,
  J as useListRef
};
//# sourceMappingURL=index.es.js.map
