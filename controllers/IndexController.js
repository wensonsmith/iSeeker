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
    res.render('index',{s:content});
}


exports.googleVerify = function(req,res){
    fs.readFile('google3f491a7ce2128d22.html', 'utf8', function(err, text){
        if(err){
            res.send(err);
        }
        res.send(text);
    });
}