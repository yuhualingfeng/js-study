#DOM
DOM（文档对象模型）是针对HTML 和XML 文档的一个API（应用程序编程接口）。DOM描,绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的某一部分
##节点层次
DOM 可以将任何HTML 或XML 文档描绘成一个由多层节点构成的结构。节点分为几种不同的类
型，每种类型分别表示文档中不同的信息及（或）标记。每个节点都拥有各自的特点、数据和方法，另
外也与其他节点存在某种关系

###节点的公共属和方法
#### `childNodes` 
获取子节点
```javascript
var firstChild = someNode.childNodes[0];
var secondChild = someNode.childNodes.item(1);
var count = someNode.childNodes.length;
```
#### `parentNode` 获取父节点
#### `firstNode` 获取第一个子节点
#### `lastNode` 获取最后一个子节点
#### `nextSibling` 获取下一个兄弟节点
#### `previousSibling` 获取上一个兄弟节点
#### `ownerDocument` 获取文档节点
#### `hasChildNodes()` 判断是否有子节点
#### `appendChild()` 添加子节点,接收一个参数表示要添加的节点,返回添加的节点.
```javascript
var returnedNode = someNode.appendChild(newNode);
alert(returnedNode == newNode); //true
alert(someNode.lastChild == newNode); //true
```
#### `insertBefore()`在参考节点前添加子节点,接收两个参数,第一个参数表示要添加的节点,第二个参数表示参考节点,返回添加的节点.
```javascript
//插入后成为第一个子节点
var returnedNode = someNode.insertBefore(newNode, someNode.firstChild);
alert(returnedNode == newNode); //true
```
#### `replaceChild()` 替换子节点,接收两个参数,第一个参数表示要添加的节点,第二个参数表示被替换的节点,返回被替换的节点.
```javascript
//替换第一个子节点
var returnedNode = someNode.replaceChild(newNode, someNode.firstChild);
```
#### `removeChild()` 移除子节点,这个方法接受一个参数，即要移除的节点。被移除的节点将成为方法的返回值
```javascript
//移除第一个子节点
var formerFirstChild = someNode.removeChild(someNode.firstChild);
```
#### `cloneChild()` 克隆节点,接收一个boolean类型的参数,当参数为true时执行深复制,意即复制内容包含其子节点.
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
`cloneNode()`方法不会复制添加到DOM 节点中的JavaScript 属性，例如事件处
理程序等。这个方法只复制特性、（在明确指定的情况下也复制）子节点，其他一切
都不会复制。IE 在此存在一个bug，即它会复制事件处理程序，所以我们建议在复制
之前最好先移除事件处理程序。
##Doucment类型
JavaScript 通过Document 类型表示文档。在浏览器中，document 对象是HTMLDocument（继承
自Document 类型）的一个实例，表示整个HTML 页面。而且，document 对象是window 对象的一个
属性，因此可以将其作为全局对象来访问
###document对象的属性和方法

#### `document.documentElement` 获取html节点元素
```javascript
var html = document.documentElement; //取得对<html>的引用
alert(html === document.childNodes[0]); //true
alert(html === document.firstChild); //true
```
#### `document.body` 获取body节点元素
#### `document.title` 获取title文字节点元素
```javascript
//取得文档标题
var originalTitle = document.title;
//设置文档标题
document.title = "New page title";
```
#### document.URL,document.domain , document.referrer
```javascript
//取得完整的URL
var url = document.URL;
//取得域名
var domain = document.domain;
//取得来源页面的URL
var referrer = document.referrer;
```
#### getElementById(),getElementsByTagName(),getElementsByTagName()
```javascript
var div = document.getElementById("myDiv"); //取得id='myDiv'元素的引用
var images = document.getElementsByTagName("img"); //取得img元素的引用
var allElements = document.getElementsByTagName("*"); //获取文档中所有的元素
```
> IE7及较低版本还为此方法添加了一个有意思的“怪癖”：name 特性与给定ID匹配的表单元素也会被该方法返回
#### `document.anchors` 包含文档中所有带name 特性的<a>元素
#### `document.forms` 包含文档中所有的<form>元素，与document.getElementsByTagName("form")得到的结果相同
#### `document.images` 包含文档中所有的<img>元素，与document.getElementsByTagName("img")得到的结果相同；
#### `document.links` 包含文档中所有带href 特性的<a>元素。
###DOM一致性检测
由于 DOM 分为多个级别，也包含多个部分，因此检测浏览器实现了DOM的哪些部分就十分必要
了。document.implementation 属性就是为此提供相应信息和功能的对象，与浏览器对DOM的实现
直接对应。DOM1 级只为document.implementation 规定了一个方法，即hasFeature()。这个方
法接受两个参数：要检测的DOM功能的名称及版本号。如果浏览器支持给定名称和版本的功能，则该
方法返回true
```javascript
var hasXmlDom = document.implementation.hasFeature("XML", "1.0");
```

以下为列出了可以检测的不同的值及版本号

1. Core            1.0、2.0、3.0            基本的DOM，用于描述表现文档的节点树
1. XML             1.0、2.0、3.0            Core的XML扩展，添加了对CDATA、处理指令及实体的支持
1. HTML            1.0、2.0                 XML的HTML扩展，添加了对HTML特有元素及实体的支持
1. Views           2.0                      基于某些样式完成文档的格式化
1. StyleSheets     2.0                      将样式表关联到文档
1. CSS             2.0                      对层叠样式表1级的支持
1. CSS2            2.0                      对层叠样式表2级的支持
1. Events          2.0，3.0                 常规的DOM事件
1. UIEvents        2.0，3.0                 用户界面事件
1. MouseEvents     2.0，3.0                 由鼠标引发的事件（click、mouseover等）
1. MutationEvents  2.0，3.0                 DOM树变化时引发的事件
1. HTMLEvents      2.0                      HTML4.01事件
1. Range           2.0                      用于操作DOM树中某个范围的对象和方法
1. Traversal       2.0                      遍历DOM树的方法
1. LS              3.0                      文件与DOM树之间的同步加载和保存
1. LS-Async        3.0                      文件与DOM树之间的异步加载和保存
1. Validation      3.0                      在确保有效的前提下修改DOM树的方法


