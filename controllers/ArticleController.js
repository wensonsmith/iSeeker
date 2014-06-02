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
var Article = require('../models/ArticleModel');
var Tag = require('../models/TagModel');
var Mapping = require('../models/MappingModel');
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
exports._add = function(req,res,next){

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
            });

            tags.forEach(function(tagName){
                Tag.getTagByName(tagName,function(err,tag){
                    if(err){
                        return next(new Error("Find Tag By Name Failed"));
                    }
                    if(!tag){
                        //没有这个标签
                        Tag.add(tagName,function(err,_tag){
                            //保存文章和标签的对应关系
                            Mapping.add(article._id,_tag._id,proxy.done('article_tag_saved'));
                            proxy.emit('tag_saved');
                        });
                    }else{
                        //标签文章数 +1
                        Tag.update(tag, tagName, tag.article_count+1, proxy.done('tag_saved'));
                        //保存文章和标签的对应关系
                        Mapping.add(article._id,tag._id,proxy.done('article_tag_saved'));
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
exports.update = function(req,res){
    var render = function(article){
        res.render('x/article/update',Render.setView({article:article},true));
    };

    var proxy = new EventProxy();
    var events = ['article'];
    proxy.all(events,render);

    Article.getArticleById(req.params.id,proxy.done(function(article){
        article.time = Render.formatDate(article.create_at,false);
        proxy.emit('article', article);
    }));
};

/**
 * 更新文章
 * @param req
 * @param res
 */
exports._update = function(req,res){
    var post = req.body;
    Article.getArticleById(req.query.id,function(err,article){
        article.title = post.title;
        article.content = post.content;
        article.url = post.url;
        if(post.time.length === 0){
            article.create_at = Date.now();
        }else{
            article.create_at = new Date(post.time);
        }
        article.save(function(){
            res.json({"status":1});
        });
    });
}

exports._list = function(req,res){
    //每页11篇文章
    var page = parseInt(req.query.page) || 1;
    var limit  = 11;

    var status = parseInt(req.query.status) || 1;

    //返回json
    var render = function(articles){
        res.json(articles);
    };

    var events = ['articles'];
    var proxy = new EventProxy();
    proxy.all(events,render);

    Article.getArticlesByPage(page,limit,status,function(err,docs){
        var titles = [];
        var contents = [];
        var result = {};
        docs.forEach(function(value,index){
            console.log(value);
            var title_item = {};
            title_item.title = value.title;
            console.log(value.create_at);
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
};

/**
 * 根据文章ID删除文章
 * @param req
 * @param res
 */
exports._delete = function(req,res){
    var id = req.query.id;
    var sendJson = function(){
        res.json(makeJson(-1,'ArticleController/api_delete: ID 不能为空'));
    };

    var events = ['tags_deleted','mapping_deleted','article_deleted'];
    var proxy = new EventProxy();
    proxy.all(events,sendJson);

    Article.deleteArticleById(id,function(err){
        if(err){
            console.log(err);
        }
        proxy.emit('article_deleted');
    });

    //删除文章所有相关Tag
    Mapping.getMappingByArticle(id,function(mappings){

        proxy.after('tag_deleted',mappings.length,function(){
            proxy.emit('tags_deleted');
        });

        mappings.forEach(function(value,index){
            Tag.deleteTagById(value.tag_id,function(err){
                if(err){
                    console.log("Tag delete fail");
                }else{
                    proxy.emit('tag_deleted');
                }
            })
        })
    });

    //删除mappings
    Mapping.deleteMappingsByArticle(id,proxy.done('mapping_deleted'));

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

    var params = {};
    var render = function(article,tags){
        params.article = article;
        params.tags = tags;
        Render.setTitle(article.title);
        res.render('index/article',Render.setView(params));
    };

    var proxy = new EventProxy();
    var events = ['article','tags'];
    proxy.all(events,render);

    Article.getArticleById(req.params.id,proxy.done(function(article){
        article.friendlyDate = Render.formatDate(article.create_at,true);
        article.content = MarkDown(article.content);
        proxy.emit('article', article);
    }));

    Mapping.getPopulateMapping(req.params.id,proxy.done('tags'));
};


var makeJson = function(status,msg){
    return {"status":status,"msg":msg};
};