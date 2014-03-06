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
    if(req.body.password == 'wensonsmith'){
        return res.send({"status":1});
    }else{
        return res.send({"status":-1});
    }
}