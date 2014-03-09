/**
 * 后台管理系统验证
 * Create by Wenson Smith
 * @email wensonsmith@gmail.com
 * @date 2013-12-11 16:20
 */

var RH = require('../Library/Utils/RenderHelper');

exports.index = function(req,res){
    var viewParams = {hello:"nani luanqibazoaldlshdh",title:"DoorMan"};
    console.log(RH.xParam(viewParams));
    res.render('admin/index',RH.xParam(viewParams));
}

exports.unlock = function(req,res){
    var key = 'FA13E2A8E29A11B0B8975476A8BA44BEX0X0';
    var sequence = 'X0X0A8BA';
    console.log(req.body.key);
    if(req.body.key == key && req.body.sequence == sequence)
        res.json({"status":1,"msg":"OK"});
    else
        res.json({"status":-1,"msg":"ERROR"});
}

exports.dashboard = function(req,res){
    var viewParams = {welcome:"Welcome , My admin",title:"DashBoard"};
    res.render('admin/dashboard',RH.xParam(viewParams));
}