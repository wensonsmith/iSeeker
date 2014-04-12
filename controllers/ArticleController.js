/**
 * Project X
 * @author Wenson Smith
 * @date 14-3-20.
 */

var Render = require('../Library/Utils/RenderHelper');

/**
 * 新加文章页面
 * @param req
 * @param res
 */
exports.add = function(req,res){
    Render.setTitle('ARTICLE');
    res.render('x/article/add',Render.setView(null,true));
}


/**
 * 保存新文章
 * @param req
 * @param res
 */
exports.save = function(req,res){

}


/**
 * 编辑文章页面
 * @param req
 * @param res
 */
exports.edit = function(req,res){

}

/**
 * 更新文章
 * @param req
 * @param res
 */
exports.update = function(req,res){

}

/**
 * 文章列表
 * @param req
 * @param res
 */
exports.list = function(req,res){

}