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

/**
 * 文章列表
 * @param req
 * @param res
 */
exports.list = function(req,res){
    Article.getArticlesByQuery();
}


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