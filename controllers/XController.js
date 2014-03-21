/**
 * 后台管理系统验证
 * Create by Wenson Smith
 * @email wensonsmith@gmail.com
 * @date 2013-12-11 16:20
 */

var Render = require('../Library/Utils/RenderHelper');

/**
 * 后台登陆页面
 * @param req
 * @param res
 */
exports.index = function(req,res){
    res.render('x/index',Render.xParam({layout:null,partials:null}));
}


/**
 * Dashboard 页面
 * @param req
 * @param res
 */
exports.dashboard = function(req,res){
    var viewParams = {welcome:"Welcome , My admin"};
    Render.setTitle('Dashboard');
    res.render('x/dashboard',Render.xParam(viewParams));
}





/**
 * 登陆验证
 * @param req
 * @param res
 */
exports.unlock = function(req,res){
    var key = 'FA13E2A8E29A11B0B8975476A8BA44BEX0X0';
    var sequence = 'X0X0A8BA';
    console.log(req.body.key);
    if(req.body.key == key && req.body.sequence == sequence)
    {
        var user = {
            key:key,
            sequence:sequence
        };
        req.session.user = user;
        res.json({"status":1,"msg":"OK"});
    }else
        res.json({"status":-1,"msg":"ERROR"});
}

