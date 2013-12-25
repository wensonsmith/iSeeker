## 苦逼的Jquery 1.9

##### 一、没有了Toggle

----
没有，就自己搞一个！ 

    $.fn.clickToggle = function(a, b) {
		    return this.each(function() {
		        var clicked = false;
		        $(this).bind("click", function() {
		            if (clicked) {
		                clicked = false;
		                return b.apply(this, arguments);
		            }
		            clicked = true;
		            return a.apply(this, arguments);
		        });
		    });
		};

使用方法：

    $("#ok").clickToggle(function(),function());

##### 二、退化的Attr
---

`attr` 担不起获取单、复选按钮的 `checked` 了， 取而代之的是  `prop`