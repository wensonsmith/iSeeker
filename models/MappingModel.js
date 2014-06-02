/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-5-14 - 下午15:53
 */

var models = require('./schema');
var MappingModel = models.Mapping;

exports.add = function(article_id,tag_id,callback){
    var mapping = new MappingModel();
    mapping.article_id = article_id;
    mapping.tag_id = tag_id;
    mapping.save(callback);
};


exports.getMappingByArticle = function(article,callback){
    MappingModel.find({'article_id':article},function(err,docs){
        if(err){
            return callback([]);
        }
        return callback(docs);
    })
};

exports.deleteMappingsByArticle = function(article,callback){
    MappingModel.remove({article_id:article},callback);
};

exports.getPopulateMapping = function(article,callback){
    MappingModel.find({'article_id':article},'tag_id').populate('tag_id','name').exec(function(err,mappings){
        var res = [];
        mappings.forEach(function(value){
            res.push(value.tag_id);
        });
        callback(err,res);
    });
};