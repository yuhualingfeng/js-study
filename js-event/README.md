##:ribbon:事件类型

###UI事件

1. `load`：当页面完全加载后在window 上面触发，当所有框架都加载完毕时在框架集上面触发，当图像加载完毕时在`<img>`元素上面触发，或者当嵌入的内容加载完毕时在`<object>`元素上面触发  
2. `unload`:当页面完全卸载后在`window` 上面触发，当所有框架都卸载后在框架集上面触发，或者当嵌入的内容卸载完毕后在`<object>`元素上面触发
3. `resize`：当窗口或框架的大小变化时在`window` 或框架上面触发  
4. `scroll`：当用户滚动带滚动条的元素中的内容时，在该元素上面触发。`<body>`元素中包含所加载页面的滚动条
5. `error`：当发生JavaScript 错误时在window上面触发，当无法加载图像时在`<img>`元素上面触发，当无法加载嵌入内容时在`<object>`元素上面触发，或者当有一或多个框架无法加载时在框架集上面触发

这些事件在DOM2级事件中都归为html事件,可以通过以下代码判断浏览器是否支持DOM2级事件

```javascript
var isSupported = document.implementation.hasFeature('HTMLEvents',2.0);
```

###焦点事件

1. `blur`：在元素失去焦点时触发。这个事件不会冒泡；所有浏览器都支持它.
2. `focus`：在元素获得焦点时触发。这个事件不会冒泡；所有浏览器都支持它

###鼠标与滚轮事件

1. `click`：在用户单击主鼠标按钮（一般是左边的按钮）或者按下回车键时触发。这一点对确保易访问性很重要，意味着onclick 事件处理程序既可以通过键盘也可以通过鼠标执行
2. `dblclick`：在用户双击主鼠标按钮（一般是左边的按钮）时触发。从技术上说，这个事件并不是DOM2 级事件规范中规定的，但鉴于它得到了广泛支持，所以DOM3 级事件将其纳入了标准。
3. `mousedown`：在用户按下了任意鼠标按钮时触发。不能通过键盘触发这个事件。
4. `mouseenter`：在鼠标光标从元素外部首次移动到元素范围之内时触发。这个事件不冒泡，而且在光标移动到后代元素上不会触发。DOM2 级事件并没有定义这个事件，但DOM3 级事件将它纳入了规范。IE、Firefox 9+和Opera 支持这个事件。
5. `mouseleave`：在位于元素上方的鼠标光标移动到元素范围之外时触发。这个事件不冒泡，而且在光标移动到后代元素上不会触发。DOM2 级事件并没有定义这个事件，但DOM3 级事件将它纳入了规范。IE、Firefox 9+和Opera 支持这个事件
6. `mousemove`：当鼠标指针在元素内部移动时重复地触发。不能通过键盘触发这个事件。
7. `mouseout`：在鼠标指针位于一个元素上方，然后用户将其移入另一个元素时触发。又移入的另一个元素可能位于前一个元素的外部，也可能是这个元素的子元素。不能通过键盘触发这个事件。
8. `mouseover`：在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触发。不能通过键盘触发这个事件
9. `mouseup`：在用户释放鼠标按钮时触发。不能通过键盘触发这个事件
10. `mousewheel`：当用户通过鼠标滚轮与页面交互、在垂直方向上滚动页面时（无论向上还是向下），就会触发mousewheel事件

使用以下代码可以检测浏览器是否支持以上DOM2 级事件（除dbclick、mouseenter 和mouseleave 之外）：
```javascript
var isSupported = document.implementation.hasFeature("MouseEvents", "2.0");
```
要检测浏览器是否支持上面的所有事件，可以使用以下代码：
```javascript
var isSupported = document.implementation.hasFeature("MouseEvent", "3.0")
```

鼠标事件都是在浏览器视口中的特定位置上发生的。这个位置信息保存在事件对象的`clientX` 和`clientY` 属性中。所有浏览器都支持这两个属性  
通过客户区坐标能够知道鼠标是在视口中什么位置发生的，而页面坐标通过事件对象的`pageX` 和`pageY` 属性,在页面没有滚动的情况下，pageX 和pageY 的值与clientX 和clientY 的值相等。IE8 及更早版本不支持事件对象上的页面坐标，不过使用客户区坐标和滚动信息可以计算出来。  
鼠标事件发生时，不仅会有相对于浏览器窗口的位置，还有一个相对于整个电脑屏幕的位置。而通过`screenX` 和`screenY`属性就可以确定鼠标事件发生时鼠标指针相对于整个屏幕的坐标信息  
虽然鼠标事件主要是使用鼠标来触发的，但在按下鼠标时键盘上的某些键的状态也可以影响到所要采取的操作。这些修改键就是`Shift`、`Ctrl`、`Alt `和`Meta`（在Windows 键盘中是Windows 键，在苹果机中是Cmd 键），它们经常被用来修改鼠标事件的行为。DOM 为此规定了4 个属性，表示这些修改键的状态：`shiftKey`、`ctrlKey`、`altKey` 和`metaKey`。这些属性中包含的都是布尔值，如果相应的键被按下了，则值为true，否则值为false。  
IE9、Firefox、Safari、Chrome 和Opera 都支持这4 个键。IE8 及之前版本不支持metaKey 属性

###键盘与文本事件

1. `keydown`：当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。
2. `keypress`：当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件。按下Esc 键也会触发这个事件
1. `keyup`：当用户释放键盘上的键时触发。
1. `textInput`:DOM3 级事件,这个事件是对keypress的补充，用意是在将文本显示给用户之前更容易拦截文本。在文本插入文本框之前会触发textInput 事件,支持textInput的浏览器有IE9+、Safari 和Chrome

在发生 keydown 和keyup 事件时，event 对象的keyCode 属性中会包含一个代码，与键盘上一
个特定的键对应。对数字字母字符键，keyCode 属性的值与ASCII 码中对应小写字母或数字的编码相
同。因此，数字键7 的keyCode 值为55，而字母A 键的keyCode 值为65——与Shift 键的状态无关,具体怎么对应的可以自己测试或者百度.
DOM 和IE 的event 对象都支持keyCode 属性

###触摸事件

1. `touchstart`:当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
2. `touchmove`:当手指在屏幕上滑动时连续地触发。在这个事件发生期间，调用preventDefault()
可以阻止滚动
3. `touchend`:当手指从屏幕上移开时触发。

每个触摸事件的event 对象都提供了在鼠标事件中常见的属性：
bubbles、cancelable、view、clientX、clientY、screenX、screenY、detail、altKey、shiftKey、
ctrlKey 和metaKey.  

除了常见的 DOM属性外，触摸事件还包含下列三个用于跟踪触摸的属性。

+ touches：表示当前跟踪的触摸操作的Touch 对象的数组。
+ targetTouchs：特定于事件目标的Touch 对象的数组。
+ changeTouches：表示自上次触摸以来发生了什么改变的Touch 对象的数组。每个 Touch 对象包含下列属性。

每个 Touch 对象包含下列属性。

+ clientX：触摸目标在视口中的x 坐标。
+ clientY：触摸目标在视口中的y 坐标。
+ identifier：标识触摸的唯一ID。
+ pageX：触摸目标在页面中的x 坐标。
+ pageY：触摸目标在页面中的y 坐标。
+ screenX：触摸目标在屏幕中的x 坐标。
+ screenY：触摸目标在屏幕中的y 坐标。
+ target：触摸的DOM 节点目标。

```html
    <div id='touchstart'></div>
    <div id='touchmove'></div>
    <div id='touchend'></div>
```

```javascript

    EventUtil.addEventHandler(document,'touchstart',function(e){
        e = EventUtil.getEvent(e);
        document.getElementById('touchstart').innerHTML=e.type+':x='+e.changedTouches[0].clientX+',y='+e.changedTouches[0].clientY;
    });

    EventUtil.addEventHandler(document,'touchmove',function(e){
        e = EventUtil.getEvent(e);
        EventUtil.preventDefault(e);
        document.getElementById('touchmove').innerHTML=e.type+':x='+e.changedTouches[0].clientX+',y='+e.changedTouches[0].clientY;
    });
    
    EventUtil.addEventHandler(document,'touchend',function(e){

        e = EventUtil.getEvent(e);
        document.getElementById('touchend').innerHTML=e.type+':x='+e.changedTouches[0].clientX+',y='+e.changedTouches[0].clientY;
    });

```

###HTML5事件

1. `contextmenu`: 支持 contextmenu 事件的浏览器有IE、Firefox、Safari、Chrome 和Opera 11+.
2. `beforeunload`: IE 和Firefox、Safari 和Chrome 都支持beforeunload 事件.
3. `DOMContentLoaded`: 形成完整的DOM 树之后就会触发，不理会图像、JavaScript 文件、CSS 文件或其他资源是否已经下载完毕.IE9+、Firefox、Chrome、Safari 3.1+和Opera 9+都支持DOMContentLoaded 事件，对于不支持DOMContentLoaded 的浏览器，我们建议在页面加载期间设置一个时间为0 毫秒的超时调用.
4. `readystatechange`:IE 为DOM文档中的某些部分提供了readystatechange 事件。这个事件的目的是提供与文档或元素的加载状态有关的信息.
5. `pageshow,pagehide`:Firefox 和Opera 有一个特性，名叫“往返缓存”（back-forward cache，或bfcache）,pageshow，这个事件在页面显示时触发,pagehide该事件会在浏览器卸载页面的时候触发,pageshow,pagehide 事件的event 对象还包含一个名为persisted 的布尔值属性。如果页面被保存在了bfcache 中，则这个属性的值为true.兼容性：Firefox、Safari 5+、Chrome 和Opera。
6. `hashchange`:URL 的参数列表（及URL 中“#”号后面的所有字符串）发生变化时触发。兼容性:IE8+、Firefox 3.6+、Safari 5+、Chrome 和Opera 10.6+。

```javascript
    //for item 3
    setTimeout(function(){
        //do something
    },0);
```
###变动事件

1. `DOMSubtreeModified`：在DOM 结构中发生任何变化时触发。这个事件在其他任何事件触发后都会触发。
2. `DOMNodeInserted`：在一个节点作为子节点被插入到另一个节点中时触发。
3. `DOMNodeRemoved`：在节点从其父节点中被移除时触发。
4. `DOMNodeInsertedIntoDocument`：在一个节点被直接插入文档或通过子树间接插入文档之后触发。这个事件在DOMNodeInserted 之后触发。
5. `DOMNodeRemovedFromDocument`：在一个节点被直接从文档中移除或通过子树间接从文档中移除之前触发。这个事件在DOMNodeRemoved 之后触发。
6. `DOMAttrModified`：在特性被修改之后触发。
7. `DOMCharacterDataModified`：在文本节点的值发生变化时触发。

`DOMSubtreeModified` `DOMNodeInserted` `DOMNodeRemoved`兼容性:Firefox 3+ Safari 3+及Chrome IE9+

##:fire:内存和性能
影响内存和性能的因素：首先，每个函数都是对象，都会占用内存；内存中的对象越多，性能就越差。其次，必须事先指定所有事件处理程序而导致的DOM访问次数，会延迟整个页面的交互就绪时间。
优化方案:通过事件委托和移除事件处理程序.

####事件委托
```html
<ul id="myLinks">
<li id="goSomewhere">Go somewhere</li>
<li id="doSomething">Do something</li>
<li id="sayHi">Say hi</li>
</ul>
```
```javascript
//传统做法
var item1 = document.getElementById("goSomewhere");
var item2 = document.getElementById("doSomething");
var item3 = document.getElementById("sayHi");
EventUtil.addHandler(item1, "click", function(event){
location.href = "http://www.wrox.com";
});
EventUtil.addHandler(item2, "click", function(event){
document.title = "I changed the document's title";
});
EventUtil.addHandler(item3, "click", function(event){
alert("hi");
});

//事件委托

var list = document.getElementById("myLinks");
EventUtil.addHandler(list, "click", function(event){
event = EventUtil.getEvent(event);
var target = EventUtil.getTarget(event);
switch(target.id){
case "doSomething":
document.title = "I changed the document's title";
break;
case "goSomewhere":
location.href = "http://www.wrox.com";
break;
case "sayHi":
alert("hi");
break;
}
});

```
####移除事件处理程序
当页面的元素被替换前需要移除其事件处理程序,页面卸载前也需要移除事件处理程序(通过onunload 事件处理程序移除所有事件处理程序).因为页面卸载后有些浏览器依然将事件处理程序保存在内存中,IE8 及更早版本在这种
情况下依然是问题最多的浏览器，尽管其他浏览器或多或少也有类似的问题.

```html
<div id="myDiv">
<input type="button" value="Click Me" id="myBtn">
</div>
<script type="text/javascript">
var btn = document.getElementById("myBtn");
btn.onclick = function(){

btn.onclick = null; //移除事件处理程序
document.getElementById("myDiv").innerHTML = "Processing..."; 

};
</script>
```





