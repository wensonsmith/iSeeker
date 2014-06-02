/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-4-28 - 下午11:53
 */

var models = require('./schema');
var Tag = models.Tag;


exports.add = function(name,callback){
    var tag = new Tag();
    tag.name = name;
    tag.save(callback);
};

exports.update = function(tag, name, article_count,callback){
    tag.name = name;
    tag.article_count = article_count;
    tag.save(callback);
};

exports.getTagByName = function(name,callback){
    Tag.findOne({name:name},callback);
};

exports.getAllTags = function(callback){
    Tag.find({}, [], {sort: [['order', 'asc']]}, callback);
};


exports.deleteTagById = function(id,callback){
    Tag.findOne({'_id':id},function(err,tag){
        if(tag.article_count === 1){
            tag.remove(callback);
        }else{
            tag.article_count = tag.article_count-1;
            tag.save( callback(err) );
        }
    })
};