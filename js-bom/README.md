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
系统对话框有三个,分别为:`alert`,`confirm`,`prompt`.
`alert`为系统提示框
```javascript
alert('nice to meet you');
```
`confirm`为确认框
```javascript
var sure = confirm('are you have a good time ?');
if(sure){
alert('yes, you have a good time !');
}
```
`prompt`为系统输入框
```javascript
var getname = prompt('what's you name ?','name');//参数1为提示语, 参数2为默认字符.
alert(getname);
```
###间歇调用和超时调用
间歇调用使用`setTimeout`方法,超时调用使用`setInterval`方法
这两个方法都有两个参数,第一个参数为执行的代码或函数,第二个参数为执行时间.
当然这两种调用也有对应的方法来清除调用.
```javascript
 setTimeout(function(){ alert('good morning!'); },1000); //一秒后弹出弹框.
 
 var count = 0;
 var interval =  setInterval(function(){      
    count++;
    if(count > 10){
         clearInterval(interval);  //清除间歇调用
        }
 },1000); 

```
`setInterval`有个不足之处是后一个间歇调用可能会在前一个间歇调用结束之前启动,因此使用`setTimeout`来模拟`setInterval`是不错的选择.
```javascript
var count = 0; 
function doSoming(){
    count ++;
    if(count<=10){
 setTimeout(doSoming,1000);    
}
}
setTimeout(doSoming,1000);
```
###获取窗口大小
通过以下代码可以跨浏览器获取页面视口大小
```javascript
var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;
if(typeof pageWidth !="number"){
    if (document.compatMode == "CSS1Compat"){
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
        }
    else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
     }
}
```
##location对象
`location` 是最有用的BOM对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能
以下是`location`对象的属性列表.  
1. `hash` 返回URL中的hash（#号后跟零或多个字符），如果URL中不包含散列，则返回空字符串,例"#contents"  
2. `host` 返回服务器名称和端口号(如果有).例"www.zhaosywz.com:80"  
3. `hostname` 返回不带端口号的服务器名称.例"www.zhaosywz.com"  
4. `href` 返回当前页面的完整url.例"www.zhaosywz.com/index.html"  
5. `pathname` 返回url中的目录或文件名,例"/category/shoes"  
6. `port` 返回url的端口号,如果没有则返回空字符串.例"8080"  
7. `protocol` 返回页面使用的协议。通常是http:或https:  
8. `search` 返回URL的查询字符串。这个字符串以问号开头,'?id=100'     
  
尽管'search'属性可以返回查询字符串,但为了更加方便的访问其参数,可以通过下面的代码将其转化为包含参数的对象.
```javascript
function getQueryStringArgs(){
    //取得查询字符串并去掉开头的问号
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
    //保存数据的对象
    args = {},
    //取得每一项
    items = qs.length ? qs.split("&") : [],
    item = null,
    name = null,
    value = null,
    //在for 循环中使用
    i = 0,
    len = items.length;
    //逐个将每一项添加到args 对象中
    for (i=0; i < len; i++){
    item = items[i].split("=");
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    if (name.length) {
    args[name] = value;
    }
    }
    return args;
}
```
通过以下任何一种方式都会导致页面的跳转或重载
```javascript
location.href = "http://www.baidu.com";
```
```javascript
location.hash = "#section1";
```
```javascript
location.search = "?q=javascript";
```
```javascript
location.hostname = "www.yahoo.com";
```
```javascript
location.pathname = "mydir";
```
```javascript
location.port = 8080;
```
通过`reload()`可以重新加载当前页面
```javascript
location.reload(); //重新加载(有可能从缓存中加载)
location.reload(true);//重新加载(直接从服务器加载)
```
##navigator对象
最早由 Netscape Navigator2.0引入的navigator对象，现在已经成为识别客户端浏览器的事实标准,navigator有以下跨浏览器属性和方法.  
1.  `appCodeName`  浏览器的名称。通常都是Mozilla，即使在非Mozilla浏览器中也是如此  
2.  `appName` 完整的浏览器名称  
3.  `appVersion` 浏览器版本，一般不与实际的浏览器版本对应.  
4.  `cookieEnabled` 表示cookie是否启用  
5.  `javaEnabled()` 表示单签浏览器是否启用Java  
6.  `onLine` 表示浏览器是否连接到了因特网  
7.  `mimeTypes` 在浏览器中注册的MIME类型数组  
8.  `platform` 浏览器的系统平台  
9.  `plugins` 浏览器中安装的插件信息的数组  
10.  `userAgent` 浏览器用户代理字符串  
`userAgent`是最常用的属性.    
  
插件检测
```javascript
//检测插件（在IE 中无效）
function hasPlugin(name){
name = name.toLowerCase();
for (var i=0; i < navigator.plugins.length; i++){
if (navigator. plugins [i].name.toLowerCase().indexOf(name) > -1){
return true;
}
}
return false;
}
//检测Flash
alert(hasPlugin("Flash"));

```
```javascript
//检测IE 中的插件
function hasIEPlugin(name){
try {
new ActiveXObject(name);
return true;
} catch (ex){
return false;
}
}
//检测Flash
alert(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));
```
##history对象
history 对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。
```javascript
//后退一页
history.go(-1);

//前进一页
history.go(1);

//前进两页
history.go(2);

//跳转到最近的包含'wrox.com'字符的页面
history.go("wrox.com");

//后退一页
history.back();
//前进一页
history.forward();

if (history.length == 0){
//这应该是用户打开窗口后的第一个页面
}
```





