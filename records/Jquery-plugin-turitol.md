###Jquery Plugin 
----
#####插件级别

1.类级别
调用方法为 $.PluginName(); 像 $.ajax,$.each 都是类级别的

写法：jQuery.PluginName = function(){..........}

即对jQuery类进行了扩展，所以也可以写为  

    $.extend($,{
    	PluginName:function(){.....}
    })

2.对象级别
调用方法为 $("Selector").PluginName();  

写法：$.fn.PluginName = function(){.........} , 即对fn对象进行了扩展，等同于

    $.extend($.fn,{
    	PluginName:function(){......}
    })


##### 插件框架

1.闭包  
因为$ 这个符号，很多里面都会用，为了防止对jQuery的破坏，所以，代码都要放在下面的结构里，这样就可以放心大胆的使用$符号了

    (function($){  
    	<code> 
    }）(jQuery); 

2.命名空间  
一个命名空间可以避免你的插件和别的插件函数名相同时引发的冲突。所以函数一半要放在


3.`this` 上下文  

在插件中，`this` 是指 `DOM` 的元素对象，可以直接取到`DOM`属性，譬如 `this.id`.  如果要使用`jQuery`里面的函数，就需要`jQuery`对象。`$(this)`  这样就是`jQuery`对象了。 可以使用函数，如 `$(this).attr('id')`; (其实就相当于 `$("#id")` 将`dom`元素转换成了`jQuery`对象) 

HTML代码：

    <html>
    <head>
    	<meta charset="UTF-8">
    	<title>This 上下文</title>
    </head>
    
    <body>
    
    	<div id="parent">
    		<div id="children_1">
    			<p id="grandson_1">大儿子</p>
    		</div>
    
    		<div id="children_2">
    			<p id="grandson_2">小儿子</p>
    		</div>
    	</div>
    	
    </body>
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="this.js"></script>
    <script type="text/javascript">
    	$('#parent').soso();
    </script>
    </html>
 

JS代码：

    (function ( $ ) {
    	$.fn.soso = function(options)
    	{
    		this.fadeOut();
    		this.hideChild();
    	};
    
    	$.fn.hideChild = function()
    	{
    		this.find("div").each(function(){
				//这里的this就已经是children了！
    			this.execChild();   //所以这一行会报错的！
    		});
    	}
    
    	$.fn.execChild = function()
    	{
    		alert("孩子调用");
    	}
    })(jQuery);

$.fn.function 只可以在this是指向parent 的时候才可以 this.function 调用。因为实在parent上执行了 soso();


