### elexValidate 表单验证使用方法
---

1. 引入 elex.validate.js
2. 表单应根据Bootstrap标准来书写，即：

 - `input` 应该包含在 class 为 `control-group` 的 `div` 中  
 - 正确的提示信息，`class`中应含有 `success`,错误的为 `error`,同时提示信息应该设置 `display:none`
 - `input` 中添加 `validate` 属性，指明使用哪种验证方式，现在支持`email`,  `mobile`,  `url`,  `string`,  `number`


3. 目前支持一个参数,当`option`为`true`时，会在输入完立马验证，为`fals`e时，是`submi`t的时候验证
 		
	`$("selector").elexValidate(option);`

4. For Example

	    <script type="text/javascript" src="./jquery.min.js"></script>
    	<script type="text/javascript" src="./elex.validate.js"></script>
    	<link rel="stylesheet" href="./bootstrap/css/bootstrap.css">
    	<script type="text/javascript" src="./bootstrap/js/bootstrap.min.js"></script>
    	
    	<form action="" id="ajaxForm">
    		<div class="control-group">
    			<input type="text" id="text1" name="email" validate="email">
    			<span class="help-inline success" style="display:none">success！</span>
    			<span class="help-inline error" style="display:none">failure！</span>
    		</div>
    		
    		<div class="control-group">
    			<input type="text" id="text2" name='url' validate="url">
    			<span class="help-inline success" style="display:none">success！</span>
    			<span class="help-inline error" style="display:none">failure！</span>
    		</div>
    		
    		<input type="submit" value="提交"> 
    	</form>
    	
    	<script type="text/javascript">
    		$("#ajaxForm").elexValidate(true);
    	</script>

