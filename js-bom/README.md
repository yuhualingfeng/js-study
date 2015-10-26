#javascript bom
ECMAScript 是JavaScript 的核心，但如果要在Web 中使用JavaScript，那么`BOM`（浏览器对象模
型）则无疑才是真正的核心。`BOM` 提供了很多对象，用于访问浏览器的功能，这些功能与任
何网页内容无关.
##window对象
`BOM` 的核心对象是`window`，它表示浏览器的一个实例。在浏览器中，window 对象有双重角色，
它既是通过JavaScript 访问浏览器窗口的一个接口，又是ECMAScript 规定的Global 对象。这意味着
在网页中定义的任何一个`对象`、`变量`和`函数`，都以window 作为其Global 对象
###全局作用域
由于 window 对象同时扮演着ECMAScript 中`Global` 对象的角色，因此所有在全局作用域中声明
的变量、函数都会变成window 对象的属性和方法  
```javascript
var age = 29;
function sayAge(){
alert(this.age);
}
alert(window.age); //29
sayAge(); //29
window.sayAge(); //29
```
全局变量不能通过delete 操作符删除，而直接在window 对象上的定义的属性可以  

```javascript
var age = 29;
window.color = "red";
//在IE < 9 时抛出错误，在其他所有浏览器中都返回false
delete window.age;
//在IE < 9 时抛出错误，在其他所有浏览器中都返回true
delete window.color; //returns true
alert(window.age); //29
alert(window.color); //undefined
```

尝试访问未声明的变量会抛出错误，但是通过查询window 对象，可以知道某个可能未声明的变量是否存在  
```javascript

//这里会抛出错误，因为oldValue 未定义
var newValue = oldValue;
//这里不会抛出错误，因为这是一次属性查询
//newValue 的值是undefined
var newValue = window.oldValue;

```
###窗口关系及框架
如果页面中包含框架，则每个框架都拥有自己的window 对象，并且保存在frames 集合中。在frames
集合中，可以通过数值索引（从0 开始，从左至右，从上到下）或者框架名称来访问相应的window 对
象。每个window 对象都有一个name 属性，其中包含框架的名称
```html
<html>
    <head>
        <title>Frameset Example</title>
        <meta charset="UTF-8">
    </head>
<frameset rows="160,*">
    <frame src="frames/frame1.html" name="topFrame">
    <frameset cols="50%,50%">
        <frame src="frames/frame2.html" name="leftFrame">
        <frame src="frames/frame3.html" name="rightFrame">
    </frameset>
</frameset>
</html>
```
以上代码创建了一个框架集，其中一个框架居上，两个框架居下。对这个例子而言，可以通过
`window.frames[0]`或者`window.frames["topFrame"]`来引用上方的框架。不过，恐怕你最好使用
top 而非window 来引用这些框架（例如，通过`top.frames[0]`）,top 对象始终指向最高（最外）层的框架，也就是浏览器窗口,与top相对的是parent,parent指向的是父框架
###窗口位置
使用下列代码可以跨浏览器取得窗口左边和上边的位置。
```javascript
var leftPos = (typeof window.screenLeft == "number") ?
window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ?
window.screenTop : window.screenY;
```
###系统对话框
系统对话框有三个,