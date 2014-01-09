/**
 * Create by Wenson Smith
 * @email wensonsmith@gmail.com
 * @date 2013-12-11 16:20
 */

var MarkDown = require('marked');
var fs = require('fs');

exports.index = function(req,res){

    var content = MarkDown('###Hello World');
    console.log(content);
    res.render('index/index',{s:content});
}
