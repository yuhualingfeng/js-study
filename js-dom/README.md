#DOM
DOM（文档对象模型）是针对HTML 和XML 文档的一个API（应用程序编程接口）。DOM描,绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的某一部分
##节点层次
DOM 可以将任何HTML 或XML 文档描绘成一个由多层节点构成的结构。节点分为几种不同的类
型，每种类型分别表示文档中不同的信息及（或）标记。每个节点都拥有各自的特点、数据和方法，另
外也与其他节点存在某种关系

###节点的公共属和方法

1. `childNodes` 获取子节点
1. `parentNode` 获取父节点
1. `firstNode` 获取第一个子节点
1. `lastNode` 获取最后一个子节点
1. `nextSibling` 获取下一个兄弟节点
1. `previousSibling` 获取上一个兄弟节点
1. `ownerDocument` 获取文档节点
1. `hasChildNodes()` 判断是否有子节点
1. `appendChild()` 添加子节点,接收一个参数表示要添加的节点,返回添加的节点.
1. `insertBefore()`在参考节点前添加子节点,接收两个参数,第一个参数表示要添加的节点,第二个参数表示参考节点,返回添加的节点.
1. `replaceChild()` 替换子节点,接收两个参数,第一个参数表示要添加的节点,第二个参数表示被替换的节点,返回被替换的节点.
1. `removeChild()` 移除子节点,这个方法接受一个参数，即要移除的节点。被移除的节点将成为方法的返回值
1. `cloneChild()` 克隆节点,接收一个boolean类型的参数,当参数为true时执行深复制,意即复制内容包含其子节点.
```html
<ul>
<li>item 1</li>
<li>item 2</li>
<li>item 3</li>
</ul>
```
```javascript
var deepList = myList.cloneNode(true);
alert(deepList.childNodes.length); //3（IE < 9）或7（其他浏览器）
var shallowList = myList.cloneNode(false);
alert(shallowList.childNodes.length); //0
```
`deepList.childNodes.length` 中的差异主要是因为IE8 及更早版本与其他浏览器处理空白字符的方式不一样。IE9 之前的版本不会为空白符创建节点。

