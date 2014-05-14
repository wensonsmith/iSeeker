/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-4-15 - 下午11:00
 */

var models = require('./schema');
var ArticleModel = models.Article;

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
        article.create_at = time;
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


exports.getArticlesByQuery = function(query,options,callback){
    var fields = ['_id','title','content','tags','create_at'];
    ArticleModel.find(query,fields,options,function(err,doc){
        if(err){
            return callback(err);
        }
        if(doc.length === 0){
            return callback(null,[]);
        }
        return callback(null,doc);

    });
}