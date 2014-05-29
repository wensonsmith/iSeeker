/**
 * Create by Wenson Smith
 * @email wensonsmith@gmail.com
 * @date 2013-12-11 16:20
 */

var MarkDown = require('marked');
var highlight = require('highlight.js');
MarkDown.setOptions({
    breaks:true,
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});
var Render = require('../Library/Utils/RenderHelper');
var ArticleModel = require('../models/articleModel');
var EventProxy = require('eventproxy');

exports.index = function(req,res){
    var page = parseInt(req.params.page, 10) || 1;
    //每页11篇文章
    var limit  = 11;
    var skip   = (page-1)*limit;
    var params = {};
    var query  = {};
    var options = {skip: skip, limit: limit, sort: [ [ 'create_at', 'desc' ] ]};

    //开始渲染页面
    var render = function(articles,pages){
        params.articles = articles;
        params.pages = pages;
        Render.setTitle("Wenson Smith")
        res.render('index/index',Render.setView(params));
    };

    var events = ['articles','pages'];
    var proxy = new EventProxy();
    proxy.all(events,render);

    ArticleModel.getArticlesByQuery(query,options,function(err,doc){
        if(err){
            console.log(err);
        }
        doc.forEach(function(value,index){
            doc[index].set('friendlyDate', Render.formatDate(value.create_at,true));
            doc[index].set('content',MarkDown(value.content.split('<!--more-->')[0]));
        });
        proxy.emit('articles',doc);
    });

    ArticleModel.getCountByQuery(query,proxy.done(function(count){
        var pagesCount = Math.ceil(count/limit);
        var pages = [];
        for(i=1;i<=pagesCount;i++){
            var pageItem = {page:null,active:false};
            pageItem.page = i;
            if(page === i){
                pageItem.active = true;
            }
            pages.push(pageItem);
        }
        proxy.emit('pages',pages);
    }))
};