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
##Text类型
文本节点由 Text 类型表示，包含的是可以照字面解释的纯文本内容。纯文本中可以包含转义后的HTML 字符，但不能包含HTML代码。  

使用下列方法可以操作节点中的文本

+ appendData(text)：将text 添加到节点的末尾。
+ deleteData(offset, count)：从offset 指定的位置开始删除count 个字符。
+ insertData(offset, text)：在offset 指定的位置插入text。
+ replaceData(offset, count, text)：用text 替换从offset 指定的位置开始到offset+count为止处的文本
+ splitText(offset)：从offset 指定的位置将当前文本节点分成两个文本节点
+ substringData(offset, count)：提取从offset 指定的位置开始到offset+count 为止处的字符串

###创建文本节点
通过`createTextNode()`可以创建文本节点.
```
var textNode = document.createTextNode("<strong>Hello</strong> world!");
```
下面展示如何将一个文本节点添加到文档中
```
var element = document.createElement("div");
element.className = "message";
var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);
document.body.appendChild(element);
```
###合并文本节点
一个元素可能会存在多个文本节点,但是文本节点之间也没有空格,因此无法区分哪个节点对应的是哪个文本,通过下面的方法可以将`element`元素的文本节点合并.
```javascript
element.normalize();
```
当然也可以分割文本节点,使用`splitText(index)`,index表示字符索引.
```javascript
var newNode = element.firstChild.splitText(5);从位置5 开始。位置5是"Hello"和"world!"之间的空格
alert(element.firstChild.nodeValue); //"Hello"
alert(newNode.nodeValue); //" world!"
alert(element.childNodes.length); //2
```
#DOM扩展
##选择符API
Selectors API Level 1 的核心是两个方法：querySelector()和querySelectorAll()。在兼容的浏
览器中，可以通过Document 及Element 类型的实例调用它们。目前已完全支持Selectors API Level 1
的浏览器有IE 8+、Firefox 3.5+、Safari 3.1+、Chrome 和Opera 10+。
###querySelector()方法
```javascript
//取得body 元素
var body = document.querySelector("body");
//取得ID 为"myDiv"的元素
var myDiv = document.querySelector("#myDiv");
//取得类为"selected"的第一个元素
var selected = document.querySelector(".selected");
//取得类为"button"的第一个图像元素
var img = document.body.querySelector("img.button");
```
###querySelectorAll()方法
```javascript
//取得某<div>中的所有<em>元素（类似于getElementsByTagName("em")）
var ems = document.getElementById("myDiv").querySelectorAll("em");
//取得类为"selected"的所有元素
var selecteds = document.querySelectorAll(".selected");
//取得所有<p>元素中的所有<strong>元素
var strongs = document.querySelectorAll("p strong");
```
##HTML5
###与类相关的扩充
####getElementsByClassName()方法
```javascript
//取得所有类中包含"username"和"current"的元素，类名的先后顺序无所谓
var allCurrentUsernames = document.getElementsByClassName("username current");
```
支持 getElementsByClassName()方法的浏览器有IE 9+、Firefox 3+、Safari 3.1+、Chrome 和
Opera 9.5+。
###焦点管理
####document.activeElement
这个属性指向的是当前获得焦点的元素,使用`focus()`可以让元素获得焦点
```javascript
var button = document.getElementById("myButton");
button.focus();
alert(document.activeElement === button); //true
```
####document.hasFocus()
这个方法用于确定文档是否获得了焦点
```javascript
var button = document.getElementById("myButton");
button.focus();
alert(document.hasFocus()); //true
```
实现了这两个属性的浏览器的包括IE 4+、Firefox 3+、Safari 4+、Chrome 和Opera 8+。
###HTMLDocument的变化
####readyState 属性
document.readyState表示文档的加载进度,它有两个值分别为'loading'和'complete'.
```
if(document.readyState == 'complete'){
    //执行操作
}
支持 readyState 属性的浏览器有IE4+、Firefox 3.6+、Safari、Chrome 和Opera 9+。
####compatMode 的属性
document.compatMode属性告诉开发人员浏览器采用了哪种渲染模式。在标准模式下，document.compatMode 的
值等于"CSS1Compat"，而在混杂模式下，document.compatMode 的值等于"BackCompat"。
```javascript
if (document.compatMode == "CSS1Compat"){
alert("Standards mode");
} else {
alert("Quirks mode");
}
```
兼容性:IE、Firefox、Safari 3.1+、Opera 和Chrome
###字符编码
####document.charset
当前文档的字符编码
####document.defaultCharset
当前文档的默认字符编码
###自定义数据属性
HTML5 规定可以为元素添加非标准的属性，但要添加前缀data-，目的是为元素提供与渲染无关的信息，或者提供语义信息。
```html
<div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
```
```javascript
var div = document.getElementById("myDiv");
//取得自定义属性的值
var appId = div.dataset.appId;
var myName = div.dataset.myname;
//设置值
div.dataset.appId = 23456;
div.dataset.myname = "Michael";

if (div.dataset.myname){
alert("Hello, " + div.dataset.myname);
}
```
支持自定义数据属性的浏览器有Firefox 6+和Chrome
###插入标记
####innerHTML属性
在读模式下，innerHTML 属性返回与调用元素的所有子节点（包括元素、注释和文本节点）对应
的HTML 标记。在写模式下，innerHTML 会根据指定的值创建新的DOM树，然后用这个DOM树完全
替换调用元素原先的所有子节点
####outerHTML 属性
在读模式下，outerHTML 返回调用它的元素及所有子节点的HTML 标签。在写模式下，outerHTML
会根据指定的HTML 字符串创建新的DOM 子树，然后用这个DOM子树完全替换调用元素。
####内存与性能问题
使用本节介绍的方法替换子节点可能会导致浏览器的内存占用问题，尤其是在IE 中，问题更加明
显。在删除带有事件处理程序或引用了其他JavaScript 对象子树时，就有可能导致内存占用问题。假设
某个元素有一个事件处理程序（或者引用了一个JavaScript 对象作为属性），在使用前述某个属性将该元
素从文档树中删除后，元素与事件处理程序（或JavaScript 对象）之间的绑定关系在内存中并没有一并
删除。如果这种情况频繁出现，页面占用的内存数量就会明显增加。因此，在使用innerHTML、
outerHTML 属性方法时，最好先手工删除要被替换的元素的所有事件处理程序和JavaScript 对象属性
###scrollIntoView()方法
```javascript
//让元素可见
document.forms[0].scrollIntoView();
```
#DOM2和DOM3
DOM2 和DOM3级分为许多模块（模块之间具有某种关联），分别描述了DOM 的某个非常具体的子集。这些模块如下

+ DOM2 级核心（DOM Level 2 Core）：在1 级核心基础上构建，为节点添加了更多方法和属性。
+ DOM2 级视图（DOM Level 2 Views）：为文档定义了基于样式信息的不同视图。
+ DOM2 级事件（DOM Level 2 Events）：说明了如何使用事件与DOM文档交互。
+ DOM2 级样式（DOM Level 2 Style）：定义了如何以编程方式来访问和改变CSS 样式信息。
+ DOM2 级遍历和范围（DOM Level 2 Traversal and Range）：引入了遍历DOM 文档和选择其特定部分的新接口。
+ DOM2 级 HTML（DOM Level 2 HTML）：在1 级HTML 基础上构建，添加了更多属性、方法和新接口

##样式
在 HTML 中定义样式的方式有3 种：通过<link/>元素包含外部样式表文件、使用<style/>元素
定义嵌入式样式，以及使用style 特性定义针对特定元素的样式。“DOM2 级样式”模块围绕这3 种应用
样式的机制提供了一套API。要确定浏览器是否支持DOM2 级定义的CSS 能力，可以使用下列代码
```javascript
var supportsDOM2CSS = document.implementation.hasFeature("CSS", "2.0");
var supportsDOM2CSS2 = document.implementation.hasFeature("CSS2", "2.0");
```
###访问元素的样式
任何支持 style 特性的HTML 元素在JavaScript 中都有一个对应的style 属性。访问和设置元素的css属性可以这样操作:
```javascript
var div = document.getElementById('myDiv');
console.log(div.style.color); //获取color值
div.style.color = 'red';    //设置color值
div.style.fontSize = '20px';//设置font-size的值(这里会将有短横线的值转化为驼峰命名来获取或设置) 
```
注：IE6+,chrome,firfox支持这种获取或设置css的方式.这里有一个特例,由于`float`是保留关键字,所以通过`cssFloat`来访问和设置,而IE中则通过`styleFloat`来设置或访问.  
元素的`style`对象除了有css的样式属性外,也包含了自己的一些属性,具体如下:

+ `cssText`：通过它能够访问和设置style 特性中的CSS代码.支持IE6+,chrome,firfox.
+ `length`：应用给元素的CSS 属性的数量。支持IE9+,chrome,firfox.
+ `parentRule`：表示CSS 信息的CSSRule 对象,后面将讨论CSSRule 类型。
+ `getPropertyPriority(propertyName)`：如果给定的属性使用了!important 设置，则返回"important"；否则，返回空字符串。支持IE9+,chrome,firfox.
+ `getPropertyValue(propertyName)`：返回给定属性的字符串值。支持IE9+、Safari,Chrome,firfox
+ `item(index)`：返回给定位置的CSS 属性的名称。支持IE9+、Safari,Chrome,firfox
+ `removeProperty(propertyName)`：从样式中删除给定属性。支持IE9+、Safari,Chrome,firfox
+ `setProperty(propertyName,value,priority)`：将给定属性设置为相应的值，并加上优先权标志（"important"或者一个空字符串）。支持IE9+、Safari,Chrome,firfox

```javascript
//设置style对象的cssText属性
myDiv.style.cssText = "width: 25px; height: 100px; background-color: green";
alert(myDiv.style.cssText);
```
###操作样式表
CSSStyleSheet 类型表示的是样式表，包括通过<link>元素包含的样式表和在<style>元素中定义的样式表,使用下面的代码可以确定浏览器是否支持DOM2 级样式表:
```javascript
var supportsDOM2StyleSheets =document.implementation.hasFeature("StyleSheets", "2.0");
```
CSSStyleSheet 继承自StyleSheet，后者可以作为一个基础接口来定义非CSS 样式表。从StyleSheet 接口继承而来的属性如下:

+ `disabled`：表示样式表是否被禁用的布尔值。这个属性是可读/写的，将这个值设置为true可以禁用样式表。
+ `href`：如果样式表是通过<link>包含的，则是样式表的URL；否则，是null。
+ `media`：当前样式表支持的所有媒体类型的集合。与所有DOM 集合一样，这个集合也有一个length 属性和一个item()方法。也可以使用方括号语法取得集合中特定的项。如果集合是空列表，表示样式表适用于所有媒体。在IE 中，media 是一个反映<link>和<style>元素media特性值的字符串。
+ `ownerNode`：指向拥有当前样式表的节点的指针，样式表可能是在HTML 中通过<link>或<style/>引入的（在XML 中可能是通过处理指令引入的）。如果当前样式表是其他样式表通过@import 导入的，则这个属性值为null。IE 不支持这个属性。
+ `parentStyleSheet`：在当前样式表是通过@import 导入的情况下，这个属性是一个指向导入它的样式表的指针。
+ `title`：ownerNode 中title 属性的值。
+ `type`：表示样式表类型的字符串。对CSS 样式表而言，这个字符串是"type/css"。

除了 disabled 属性之外，其他属性都是只读的。在支持以上所有这些属性的基础上，CSSStyleSheet 类型还支持下列属性和方法：

+ cssRules：样式表中包含的样式规则的集合。IE 不支持这个属性，但有一个类似的rules 属性。
+ ownerRule：如果样式表是通过@import 导入的，这个属性就是一个指针，指向表示导入的规则；否则，值为null。IE 不支持这个属性。
+ deleteRule(index)：删除cssRules 集合中指定位置的规则。IE 不支持这个方法，但支持一个类似的removeRule()方法。
+ insertRule(rule,index)：向cssRules 集合中指定的位置插入rule 字符串。IE 不支持这个方法，但支持一个类似的addRule()方法。

应用于文档的所有样式表是通过 `document.styleSheets` 集合来表示的。也可以直接通过<link>或<style>元素取得CSSStyleSheet 对象。DOM 规定了一个包含CSSStyleSheet 对象的属性，名叫`sheet`；除了IE，其他浏览器都支持这个属性。IE 支持的是`styleSheet`属性

###元素大小
####偏移量

+ `offsetHeight`：元素在垂直方向上占用的空间大小，以像素计。包括元素的高度、（可见的）水平滚动条的高度、上边框高度和下边框高度。
+ `offsetWidth`：元素在水平方向上占用的空间大小，以像素计。包括元素的宽度、（可见的）垂直滚动条的宽度、左边框宽度和右边框宽度。
+ `offsetLeft`：元素的左外边框至包含元素的左内边框之间的像素距离。
+ `offsetTop`：元素的上外边框至包含元素的上内边框之间的像素距离。

####客户区大小
有关客户区大小的属性有两个：clientWidth 和clientHeight。其中，clientWidth 属性是元素内容区宽度加上左右内边距宽度；clientHeight 属性是元素内容区高度加上上下内边距高度
####滚动大小
+ scrollHeight：在没有滚动条的情况下，元素内容的总高度。
+ scrollWidth：在没有滚动条的情况下，元素内容的总宽度。
+ scrollLeft：被隐藏在内容区域左侧的像素数。通过设置这个属性可以改变元素的滚动位置。
+ scrollTop：被隐藏在内容区域上方的像素数。通过设置这个属性可以改变元素的滚动位置。
####确定元素大小
IE、Firefox 3+、Safari 4+、Opera 9.5 及Chrome 为每个元素都提供了一个getBoundingClientRect()方
法。这个方法返回会一个矩形对象，包含4 个属性：left、top、right 和bottom。这些属性给出了元素在页面中相对于视口的位置。但是，浏览器的实现稍有不同。IE8 及更早版本认为文档的左上角坐
标是(2, 2)，而其他浏览器包括IE9 则将传统的(0,0)作为起点坐标。因此，就需要在一开始检查一下位于
(0,0)处的元素的位置，在IE8 及更早版本中，会返回(2,2)，而在其他浏览器中会返回(0,0)
##遍历
“DOM2 级遍历和范围”模块定义了两个用于辅助完成顺序遍历DOM 结构的类型：NodeIterator
和TreeWalker。这两个类型能够基于给定的起点对DOM 结构执行深度优先（depth-first）的遍历操作。
在与DOM 兼容的浏览器中（Firefox 1 及更高版本、Safari 1.3 及更高版本、Opera 7.6 及更高版本、Chrome
0.2 及更高版本），都可以访问到这些类型的对象。IE 不支持DOM 遍历。使用下列代码可以检测浏览器
对DOM2 级遍历能力的支持情况。
```javascript
var supportsTraversals = document.implementation.hasFeature("Traversal", "2.0");
var supportsNodeIterator = (typeof document.createNodeIterator == "function");
var supportsTreeWalker = (typeof document.createTreeWalker == "function");
```
##范围
为了让开发人员更方便地控制页面，“DOM2 级遍历和范围”模块定义了“范围”（range）接口。通
过范围可以选择文档中的一个区域，而不必考虑节点的界限（选择在后台完成，对用户是不可见的）。
在常规的DOM 操作不能更有效地修改文档时，使用范围往往可以达到目的。Firefox、Opera、Safari 和
Chrome 都支持DOM 范围。IE 以专有方式实现了自己的范围特性。
