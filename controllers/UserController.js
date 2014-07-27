/**
 * Create by Wenson Smith
 * @email wensonsmith@gmail.com
 * @date 2013-12-11 16:20
 */

var Render = require('../Library/Utils/RenderHelper');

exports.index = function(req,res){
    return res.send("hello");
};


exports.wensonsmith = function(req,res){
    Render.setTitle("I'm Wenson Smith")
    res.render('index/wensonsmith',Render.setView({}));
};



