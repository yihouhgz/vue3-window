<img src="https://react-window.vercel.app/og.svg" alt="react-window 标志" width="400" height="210" />

`vue3-window` 是一个组件库，帮助在不牺牲性能的前提下快速渲染大量数据。它已经在很多地方得到使用，例如 React DevTools 与 Replay 浏览器等。



## 安装


```sh
npm install vue3-window
```

## TypeScript 类型

TypeScript 类型定义已包含在发布的 `dist` 目录中。

## 常见问题

常见问题参见：[react-window 常见问题](https://react-window.vercel.app/common-questions)。

## 文档

相关文档见 [react-window.vercel.app](https://react-window.vercel.app/)。1.x 版本的文档参考 [react-window-v1.vercel.app](https://react-window-v1.vercel.app/)。

### List

<!-- List:description:begin -->

用于渲染包含许多行的数据。

<!-- List:description:end -->

#### 必需的 props

<!-- List:required-props:begin -->

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>rowComponent</td>
      <td>
        <p>负责渲染单行的组件。</p>
        <p>默认会接收 <code>index</code> 与 <code>style</code> 两个 prop；此外还会接收传入 <code>rowProps</code> 的值。</p>
        <p>ℹ️ 该组件的 prop 类型以 <code>RowComponentProps</code> 的形式导出。</p>
      </td>
    </tr>
    <tr>
      <td>rowCount</td>
      <td>
        <p>列表中要渲染的条目总数。</p>
      </td>
    </tr>
    <tr>
      <td>rowHeight</td>
      <td>
        <p>行高，支持以下格式：</p>
        <ul>
          <li>像素值（number）</li>
          <li>相对于列表当前高度的百分比（string）</li>
          <li>根据索引与 <code>cellProps</code> 计算像素值的函数</li>
          <li>由 <code>useDynamicRowHeight</code> 钩子返回的动态行高缓存</li>
        </ul>
        <p>⚠️ 动态行高不如预设尺寸高效；如果可以提前确定行高，建议直接提供固定值。</p>
      </td>
    </tr>
    <tr>
      <td>rowProps</td>
      <td>
        <p>传递给行渲染组件的额外 props。</p>
        <p>当此对象中的值变化时，List 会自动重新渲染对应行。</p>
        <p>⚠️ 此对象不得包含 <code>ariaAttributes</code>、<code>index</code> 或 <code>style</code>。</p>
      </td>
    </tr>
  </tbody>
</table>

<!-- List:required-props:end -->

#### 可选的 props

<!-- List:optional-props:begin -->

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>className</td>
      <td><p>CSS 类名。</p></td>
    </tr>
    <tr>
      <td>style</td>
      <td>
        <p>可选的 CSS 样式。</p>
        <p>渲染行会填充此样式定义的高度。</p>
      </td>
    </tr>
    <tr>
      <td>children</td>
      <td>
        <p>在列表内部（行之上）渲染的额外内容。</p>
        <p>可用于渲染覆盖层或工具提示等。</p>
      </td>
    </tr>
    <tr>
      <td>defaultHeight</td>
      <td>
        <p>初次渲染时的默认高度。</p>
        <p>在服务端渲染场景中尤为重要。</p>
      </td>
    </tr>
    <tr>
      <td>listRef</td>
      <td>
        <p>用于与组件的命令式 API 交互的 ref。</p>
        <p>该 API 提供滚动等方法，以及最外层 DOM 元素的 getter。</p>
        <p>ℹ️ TypeScript 项目可使用导出的 <code>useListRef</code> 与 <code>useListCallbackRef</code> 辅助钩子。</p>
      </td>
    </tr>
    <tr>
      <td>onResize</td>
      <td>
        <p>当 List 最外层 HTMLElement 尺寸变化时的回调。</p>
        <p>可用于在尺寸变化后重新滚动某一行进入可视区域。</p>
      </td>
    </tr>
    <tr>
      <td>onRowsRendered</td>
      <td><p>当可见行范围变化时的回调。</p></td>
    </tr>
    <tr>
      <td>overscanCount</td>
      <td>
        <p>在可视区域之外额外渲染的行数。</p>
        <p>可在滚动时减少边缘闪烁。</p>
      </td>
    </tr>
    <tr>
      <td>tagName</td>
      <td>
        <p>用于覆盖 List 根元素的标签名。</p>
        <p>默认值为 <code>div</code>，即渲染为 HTMLDivElement。</p>
        <p>⚠️ 大多数情况下默认的 ARIA 角色足够，无需设置此项。</p>
      </td>
    </tr>
  </tbody>
</table>

<!-- List:optional-props:end -->

### Grid

<!-- Grid:description:begin -->

用于渲染包含多行多列的数据表格。

ℹ️ 与 `List` 行不同，`Grid` 的单元格尺寸必须在渲染前确定：要么是静态尺寸，要么能根据 `CellProps` 中的数据在不渲染的情况下推导出来。

<!-- Grid:description:end -->

#### 必需的 props

<!-- Grid:required-props:begin -->

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>cellComponent</td>
      <td>
        <p>负责渲染单元格的组件。</p>
        <p>默认会接收 <code>index</code> 与 <code>style</code> 两个 prop；此外还会接收传入 <code>cellProps</code> 的值。</p>
        <p>ℹ️ 该组件的 prop 类型以 <code>CellComponentProps</code> 的形式导出。</p>
      </td>
    </tr>
    <tr>
      <td>cellProps</td>
      <td>
        <p>传递给单元格渲染组件的额外 props。</p>
        <p>当此对象中的值变化时，Grid 会自动重新渲染对应单元格。</p>
        <p>⚠️ 此对象不得包含 <code>ariaAttributes</code>、<code>columnIndex</code>、<code>rowIndex</code> 或 <code>style</code>。</p>
      </td>
    </tr>
    <tr>
      <td>columnCount</td>
      <td><p>要渲染的列数。</p></td>
    </tr>
    <tr>
      <td>columnWidth</td>
      <td>
        <p>列宽，支持以下格式：</p>
        <ul>
          <li>像素值（number）</li>
          <li>相对于网格当前宽度的百分比（string）</li>
          <li>根据索引与 <code>cellProps</code> 计算像素值的函数</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>rowCount</td>
      <td><p>要渲染的行数。</p></td>
    </tr>
    <tr>
      <td>rowHeight</td>
      <td>
        <p>行高，支持以下格式：</p>
        <ul>
          <li>像素值（number）</li>
          <li>相对于网格当前高度的百分比（string）</li>
          <li>根据索引与 <code>cellProps</code> 计算像素值的函数</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<!-- Grid:required-props:end -->

#### 可选的 props

<!-- Grid:optional-props:begin -->

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>className</td>
      <td><p>CSS 类名。</p></td>
    </tr>
    <tr>
      <td>dir</td>
      <td>
        <p>指定网格单元格的文本方向。</p>
        <p>ℹ️ 详情参见 HTML 全局属性 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir"><code>dir</code></a>。</p>
      </td>
    </tr>
    <tr>
      <td>style</td>
      <td>
        <p>可选的 CSS 样式。</p>
        <p>单元格网格会填充该样式定义的宽高。</p>
      </td>
    </tr>
    <tr>
      <td>children</td>
      <td>
        <p>在网格内部（单元格之上）渲染的额外内容。</p>
        <p>可用于渲染覆盖层或工具提示等。</p>
      </td>
    </tr>
    <tr>
      <td>defaultHeight</td>
      <td>
        <p>初次渲染时的默认高度。</p>
        <p>在服务端渲染场景中尤为重要。</p>
      </td>
    </tr>
    <tr>
      <td>defaultWidth</td>
      <td>
        <p>初次渲染时的默认宽度。</p>
        <p>在服务端渲染场景中尤为重要。</p>
      </td>
    </tr>
    <tr>
      <td>gridRef</td>
      <td>
        <p>Grid 的命令式 API。</p>
        <p>ℹ️ TypeScript 项目可使用导出的 <code>useGridRef</code> 与 <code>useGridCallbackRef</code> 辅助钩子。</p>
      </td>
    </tr>
    <tr>
      <td>onCellsRendered</td>
      <td><p>当渲染的单元格范围变化时的回调。</p></td>
    </tr>
    <tr>
      <td>onResize</td>
      <td>
        <p>当 Grid 最外层 HTMLElement 尺寸变化时的回调。</p>
        <p>可用于在尺寸变化后重新滚动某个单元格进入可视区域。</p>
      </td>
    </tr>
    <tr>
      <td>overscanCount</td>
      <td>
        <p>在可视区域之外额外渲染的行 / 列数。</p>
        <p>可在滚动时减少边缘闪烁。</p>
      </td>
    </tr>
    <tr>
      <td>tagName</td>
      <td>
        <p>用于覆盖 List 组件根元素的标签名。</p>
        <p>默认值为 <code>div</code>，即渲染为 HTMLDivElement。</p>
        <p>⚠️ 大多数情况下默认的 ARIA 角色足够，无需设置此项。</p>
      </td>
    </tr>
  </tbody>
</table>

<!-- Grid:optional-props:end -->
