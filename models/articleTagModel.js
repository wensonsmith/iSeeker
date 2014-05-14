/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-5-14 - 下午15:53
 */

var models = require('./schema');
var ArticleTagModel = models.ArticleTag;

exports.add = function(article_id,tag_id,callback){
    var articleTag = new ArticleTagModel();
    articleTag.article_id = article_id;
    articleTag.tag_id = tag_id;
    articleTag.save(callback);
};