/**
 * Create by Wenson Smith
 * @email wensonsmith@gmail.com
 * @date 2013-12-11 16:20
 */

var MarkDown = require('marked');
var Render = require('../Library/Utils/RenderHelper');

var ArticleModel = require('../models/articleModel');
//var fs = require('fs');

exports.index = function(req,res){
    var params = {articles:null};
    var query = {};
    var options = {limit: 100};
    ArticleModel.getArticlesByQuery(query,options,function(err,doc){
        if(err){
            console.log(err);
        }
        doc.forEach(function(value,index){
            doc[index].friendlyDate = Render.formatDate(value.create_at,true);
            doc[index].content = MarkDown(value.content);
            doc[index]['class'] = getArticleClass(index);
        });
        params.articles = doc;
        res.render('index/index',Render.setView(params));
    });

}

var getArticleClass = function(index){
    if(index == 0)
    {
        return 'first';
    }else{
        if(index % 2 == 1){
            return 'second';
        }else{
            return 'third';
        }
    }
}
