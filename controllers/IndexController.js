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
var ArticleModel = require('../models/ArticleModel');
var TagModel = require('../models/TagModel');
var MappingModel = require('../models/MappingModel');
var EventProxy = require('eventproxy');

var DELETE = -1, DRAFT = 0, PUBLISH = 1;

exports.index = function(req,res){
    //文章分页，每页11篇文章
    var page = parseInt(req.params.page, 10) || 1;
    var limit  = 11;

    var params = {};
    //页面渲染函数
    var render = function(articles,tags,pages){

        articles.forEach(function(value,index){
            articles[index]['friendlyDate']  = Render.formatDate(value.create_at,true);
            articles[index]['content'] = MarkDown(value.content.split('<!--more-->')[0]);
            articles[index]['tags'] = tags[value._id];

            console.log(articles[index]['tags']);
        });

        params.articles = articles;
        params.pages = pages;
        Render.setTitle("Wenson Smith")
        res.render('index/index',Render.setView(params));
    };

    var events = ['articles','tags','pages'];
    var proxy = new EventProxy();
    proxy.all(events,render);

    //根据页数获取文章
    ArticleModel.getArticlesByPage(page,limit,PUBLISH,function(err,docs){

        var allTags = {};
        proxy.after('tag',docs.length,function(){
            proxy.emit('tags',allTags);
        });

        docs.forEach(function(value,index){
//            docs[index].set('friendlyDate', Render.formatDate(value.create_at,true));
//            docs[index].set('content',MarkDown(value.content.split('<!--more-->')[0]));

            //获取Tags
            MappingModel.getPopulateMapping(value._id,function(err,mapping){
                allTags[value._id] = mapping;
                proxy.emit('tag');
            });
        });
        proxy.emit('articles',docs);
    });

    //获取文章分页
    ArticleModel.getArticlePages(page,limit,PUBLISH,function(pages){
        proxy.emit('pages',pages);
    });

};

exports.timemachine = function(req,res){
    var params = {};
    Render.setTitle("时光机")
    res.render('index/timemachine',Render.setView(params));
};