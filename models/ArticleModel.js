/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-4-15 - 下午11:00
 */

var models = require('./schema');
var ArticleModel = models.Article;


/**
 * 根据页数来获取文章
 * @param page          页数
 * @param limit         每页数量
 * @param status        文章状态  -1:删除  0:草稿  1:发布
 * @param callback
 */
exports.getArticlesByPage = function(page, limit, status, callback){
    var skip   = (page-1)*limit;
    var query  = {status:status};
    var options = {skip: skip, limit: limit, sort:[{'create_at':'desc'}]};
    ArticleModel.find(query,null,options,function(err,docs){
        if(err){
            console.log('ArticleModel/getArticlesByPage:Get articles error');
            return callback(err);
        }
        if(docs.length === 0){
            return callback(null,[]);
        }
        return callback(null,docs);
    });
};

/**
 * 获取文章分页Object
 * @param status      文章状态
 * @param limit       每页数量
 * @param page        当前页数
 * @param callback
 */
exports.getArticlePages = function(page,limit,status,callback){
    var query = {status:status};
    ArticleModel.count(query,function(err,count){
        if(err){
            console.log("ArticleModel/getArticlePages: Get count error");
        }
        var pagesCount = Math.ceil(count/limit);
        var pages = [];
        for(var i=1;i<=pagesCount;i++){
            var pageItem = {page:null,active:false};
            pageItem.page = i;
            if(page === i){
                pageItem.active = true;
            }
            pages.push(pageItem);
        }
        callback(pages);
    })
};


/**
 * 添加文章
 * @param title
 * @param content
 * @param url
 * @param callback
 * @param time
 */
exports.add = function(title,content,url,time,callback){
    var article = new ArticleModel();
    article.title = title;
    article.content = content;
    article.url = url;
    if(time.length === 0){
        article.create_at = Date.now();
    }else{
        article.create_at = new Date(time);
    }
    article.save(callback);
}

/**
 * 根据ID获取文章
 * @param id
 * @param callback
 */
exports.getArticleById = function(id,callback){
    ArticleModel.findOne({_id:id},callback);
}


/**
 * 根据查询条件是删除文章
 * @param query
 * @param callback
 */
exports.deleteArticleByQuery = function(query,callback){
    ArticleModel.find(query).remove(callback);
};


exports.deleteArticleById = function(id,callback){
    ArticleModel.remove({_id:id},callback);
}
