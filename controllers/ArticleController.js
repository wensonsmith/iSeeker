/**
 * Project X
 * @author Wenson Smith
 * @date 14-3-20.
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
var Article = require('../models/articleModel');
var Tag = require('../models/tagModel');
var ArticleTag = require('../models/articleTagModel');
var EventProxy = require('eventproxy');

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
 * @param next
 */
exports.save = function(req,res,next){

    var post = req.body;

    //保存文章先
    Article.add(post.title,post.content,post.url,post.time,function(err,article){
        if(err){
            return next(new Error("Article Add Failed"));
        }

        var proxy = new EventProxy();
        proxy.all('tags_saved','articles_tags_saved',function(){
            res.json({"status":1,"article":article._id});
        });

        //___________处理标签
        //如果没有标签
        if(post.tags.length === 0 ){
            proxy.emit('tags_saved');
        }else{
            //根据空格拆分标签
            var tags = post.tags.split(" ");
            proxy.after('tag_saved',tags.length,function(){
                proxy.emit('tags_saved');
            });
            //文章标签全部对应保存
            proxy.after('article_tag_saved',tags.length,function(){
                proxy.emit('articles_tags_saved');
            })

            tags.forEach(function(tagName){
                Tag.getTagByName(tagName,function(err,tag){
                    if(err){
                        return next(new Error("Find Tag By Name Failed"));
                    }
                    if(!tag){
                        //没有这个标签
                        Tag.add(tagName,function(err,_tag){
                            //保存文章和标签的对应关系
                            ArticleTag.add(article._id,_tag._id,proxy.done('article_tag_saved'));
                            proxy.emit('tag_saved');
                        });
                    }else{
                        //标签文章数 +1
                        Tag.update(tag, tagName, tag.article_count+1, proxy.done('tag_saved'));
                        //保存文章和标签的对应关系
                        ArticleTag.add(article._id,tag._id,proxy.done('article_tag_saved'));
                    }
                })
            })
        }//___________标签处理结束
    });
};


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

exports.api_list = function(req,res){
    var page = parseInt(req.query.page) || 1;
    //每页11篇文章
    var limit  = 11;
    var skip   = (page-1)*limit;
    var query  = {title: { $ne : '' }};
    var options = {skip: skip, limit: limit, sort: [ [ 'create_at', 'desc' ] ]};

    //开始渲染页面
    var render = function(articles,pages){
        articles.pages = pages;
        res.json(articles);
    };

    var events = ['articles','pages'];
    var proxy = new EventProxy();
    proxy.all(events,render);

    Article.getArticlesByQuery(query,options,function(err,doc){
        if(err){
            console.log(err);
        }
        var titles = [];
        var contents = [];
        var result = {};
        doc.forEach(function(value,index){
            var title_item = {};
            title_item.title = value.title;
            title_item.time  = Render.formatDate(value.create_at,true);
            titles.push(title_item);

            var content_item = {};
            content_item.id = value._id;
            content_item.content = MarkDown(value.content);
            contents.push(content_item);
        });
        result.titles = titles;
        result.contents = contents;
        proxy.emit('articles',result);
    });

    Article.getCountByQuery(query,proxy.done(function(count){
        var all_pages = Math.ceil(count/limit);
        var pages = {};
        pages.all_pages = all_pages;
        pages.current_page = page;
//        var pages = [];
//        for(i=1;i<=pagesCount;i++){
//            var pageItem = {page:null,active:false};
//            pageItem.page = i;
//            if(page === i){
//                pageItem.active = true;
//            }
//            pages.push(pageItem);
//        }
        proxy.emit('pages',pages);
    }))
};

exports.api_delete = function(req,res){
    var id = req.query.id
    options = {};
    var query = {_id:id};
    Article.deleteArticleById(id);
    res.json({"status":1});
};

/**
 * 文章列表
 * @param req
 * @param res
 */
exports.list = function(req,res){
    var params = {};
    res.render('x/article/list',Render.setView(params,true));
};


exports.article = function(req,res){

    var render = function(article){
        res.render('index/article',Render.setView({article:article}));
    };

    var proxy = new EventProxy();
    var events = ['article'];
    proxy.all(events,render);

    Article.getArticleById(req.params.id,proxy.done(function(article){
        article.friendlyDate = Render.formatDate(article.create_at,true);
        article.content = MarkDown(article.content);
        proxy.emit('article', article);
    }));
}