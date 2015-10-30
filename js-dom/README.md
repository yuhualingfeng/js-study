#DOM
DOM（文档对象模型）是针对HTML 和XML 文档的一个API（应用程序编程接口）。DOM描,绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的某一部分
##节点层次
DOM 可以将任何HTML 或XML 文档描绘成一个由多层节点构成的结构。节点分为几种不同的类
型，每种类型分别表示文档中不同的信息及（或）标记。每个节点都拥有各自的特点、数据和方法，另
外也与其他节点存在某种关系

###节点的公共属和方法
#### childNodes
获取子节点
```javascript
var firstChild = someNode.childNodes[0];
var secondChild = someNode.childNodes.item(1);
var count = someNode.childNodes.length;
```
#### parentNode
获取父节点
#### firstNode
获取第一个子节点
#### lastNode
获取最后一个子节点
#### nextSibling
获取下一个兄弟节点
#### previousSibling
获取上一个兄弟节点
#### ownerDocument 
获取文档节点
#### hasChildNodes() 
判断是否有子节点
#### appendChild()
添加子节点,接收一个参数表示要添加的节点,返回添加的节点.
```javascript
var returnedNode = someNode.appendChild(newNode);
alert(returnedNode == newNode); //true
alert(someNode.lastChild == newNode); //true
```
#### insertBefore()
在参考节点前添加子节点,接收两个参数,第一个参数表示要添加的节点,第二个参数表示参考节点,返回添加的节点.
```javascript
//插入后成为第一个子节点
var returnedNode = someNode.insertBefore(newNode, someNode.firstChild);
alert(returnedNode == newNode); //true
```
#### replaceChild()
替换子节点,接收两个参数,第一个参数表示要添加的节点,第二个参数表示被替换的节点,返回被替换的节点.
```javascript
//替换第一个子节点
var returnedNode = someNode.replaceChild(newNode, someNode.firstChild);
```
#### removeChild()
移除子节点,这个方法接受一个参数，即要移除的节点。被移除的节点将成为方法的返回值
```javascript
//移除第一个子节点
var formerFirstChild = someNode.removeChild(someNode.firstChild);
```
#### cloneNode()
克隆节点,接收一个boolean类型的参数,当参数为true时执行深复制,意即复制内容包含其子节点.
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

#### documentElement
获取html节点元素
```javascript
var html = document.documentElement; //取得对<html>的引用
alert(html === document.childNodes[0]); //true
alert(html === document.firstChild); //true
```
#### body
获取body节点元素
#### title
获取title文字节点元素
```javascript
//取得文档标题
var originalTitle = document.title;
//设置文档标题
document.title = "New page title";
```
#### URL
取得完整的URL
#### domain 
取得域名
#### referrer
取得来源页面的URL
```javascript
//取得完整的URL
var url = document.URL;
//取得域名
var domain = document.domain;
//取得来源页面的URL
var referrer = document.referrer;
```
#### getElementById()
通过id属性获取元素
#### getElementsByTagName()
通过元素名获取元素
```javascript
var div = document.getElementById("myDiv"); //取得id='myDiv'元素的引用
var images = document.getElementsByTagName("img"); //取得img元素的引用
var allElements = document.getElementsByTagName("*"); //获取文档中所有的元素
```
> IE7及较低版本还为此方法添加了一个有意思的“怪癖”：name特性与给定ID匹配的表单元素也会被该方法返回

#### document.anchors
包含文档中所有带name 特性的<a>元素
#### document.forms
包含文档中所有的<form>元素，与document.getElementsByTagName("form")得到的结果相同
#### document.images
包含文档中所有的<img>元素，与document.getElementsByTagName("img")得到的结果相同；
#### document.links
包含文档中所有带href 特性的<a>元素。
### DOM一致性检测
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
##Element类型
###HTML元素
所有 HTML 元素都由HTMLElement 类型表示，不是直接通过这个类型，也是通过它的子类型来表
示。HTMLElement 类型直接继承自Element 并添加了一些属性。添加的这些属性分别对应于每个HTML
元素中都存在的下列标准特性。

+ id，元素在文档中的唯一标识符。
+ title，有关元素的附加说明信息，一般通过工具提示条显示出来。
+ lang，元素内容的语言代码，很少使用。
+ dir，语言的方向，值为"ltr"（left-to-right，从左至右）或"rtl"（right-to-left，从右至左），也很少使用。
+ className，与元素的class 特性对应，即为元素指定的CSS类。没有将这个属性命名为class，是因为class 是ECMAScript 的保留字

```html
<div id="myDiv" class="bd" title="Body text" lang="en" dir="ltr"></div>
```
```javascript
var div = document.getElementById("myDiv");
alert(div.id); //"myDiv""
alert(div.className); //"bd"
alert(div.title); //"Body text"
alert(div.lang); //"en"
alert(div.dir); //"ltr"

div.id = "someOtherId";
div.className = "ft";
div.title = "Some other text";
div.lang = "fr";
div.dir ="rtl";
```
####特性操作
有三个方法可以操作元素的特性,`getAttribute()` `setAttribute()` `removeAttribute()`
```javascript
var div = document.getElementById("myDiv");
alert(div.getAttribute("id")); //"myDiv"
alert(div.getAttribute("class")); //"bd"

div.setAttribute("id", "someOtherId");
div.setAttribute("class", "ft");
div.setAttribute("title", "Some other text");

div.removeAttribute("class");
```
有两类特殊的特性，它们虽然有对应的属性名，但属性的值与通过getAttribute()返回的值并不
相同。第一类特性就是style，用于通过CSS 为元素指定样式。在通过getAttribute()访问时，返
回的style 特性值中包含的是CSS 文本，而通过属性来访问它则会返回一个对象。
第二类与众不同的特性是onclick 这样的事件处理程序。当在元素上使用时，onclick 特性中包
含的是JavaScript 代码，如果通过getAttribute()访问，则会返回相应代码的字符串.  
IE6 及以前版本不支持removeAttribute()。
####attributes 属性
Element类型是使用`attributes`属性的唯一一个DOM节点类型,`attributes`属性是NamedNodeMap类型的对象,它有以下几个方法

+ getNamedItem(name)：返回nodeName 属性等于name 的节点；
+ removeNamedItem(name)：从列表中移除nodeName 属性等于name 的节点；
+ setNamedItem(node)：向列表中添加节点，以节点的nodeName 属性为索引；
+ item(pos)：返回位于数字pos 位置处的节点。

```javascript
var id = element.attributes.getNamedItem("id").nodeValue;
var id = element.attributes["id"].nodeValue;
element.attributes["id"].nodeValue = "someOtherId";
```
由于`attributes`的方法不够方便，因此开发人员更多的会使用`getAttribute()`、`removeAttribute()`和`setAttribute()`方法。
####创建元素
使用 document.createElement()方法可以创建新元素。这个方法只接受一个参数，即要创建元素的标签名。
```javascript
var div = document.createElement('div');
div.id = 'myDiv';
div.className = 'box';

document.appendChild(div);
```
在 IE 中可以以另一种方式使用createElement()，即为这个方法传入完整的元素标签，也可以包含属性，如下面的例子所示。
```javascript
var div = document.createElement("<div id=\"myNewDiv\" class=\"box\"></div >");
```
这种方式有助于避开在IE7 及更早版本中动态创建元素的某些问题。下面是已知的一些这类问题。

+ 不能设置动态创建的`<iframe>`元素的name 特性
+ 不能通过表单的`reset()`方法重设动态创建的<input>元素
+ 动态创建的 type 特性值为"reset"的`<buttou>`元素重设不了表单
+ 动态创建的一批name 相同的单选按钮彼此毫无关系。name 值相同的一组单选按钮本来应该用于表示同一选项的不同值，但动态创建的一批这种单选按钮之间却没有这种关系

上述所有问题都可以通过在 `createElement()`中指定完整的HTML标签来解决，如下面的例子所示。
```javascript
if (client.browser.ie && client.browser.ie <=7){
//创建一个带name 特性的iframe 元素
var iframe = document.createElement("<iframe name=\"myframe\"></iframe>");
//创建input 元素
var input = document.createElement("<input type=\"checkbox\">");
//创建button 元素
var button = document.createElement("<button type=\"reset\"></button>");
//创建单选按钮
var radio1 = document.createElement("<input type=\"radio\" name=\"choice\" "＋
"value=\"1\">");
var radio2 = document.createElement("<input type=\"radio\" name=\"choice\" "＋
"value=\"2\">");
}
```





