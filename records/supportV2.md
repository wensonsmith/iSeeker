### Support V2 参数规定

- `sig_user`   
用户唯一标示，页游端使用337的identify_id (elex337__*****),手游方便使用自己运算出的唯一ID  

- `name`  
用户名称，会在第一次注册用户时使用

- `email`  
邮件地址，这是必须的！  

- `type`  
客诉类型

- `tags`  
标签们  

- `subject`  
客诉题目

- `description`  
客诉描述

- `gKey`  
服务器编号

- `browser_version` 或 `mobile_name`  
如果是页面提交，则打入浏览器信息，手机端则打入手机型号

- `flash_version` 或 `mobile_system`  
页面，则打入flash版本，手机端打入系统版本
  
- `trans_protocol` 或 `uuid`  
传输协议（http/https）挺废的，uuid则是交易的id，可以查询交易账单