/**
 * Created by Administrator on 2013/11/13.
 */

var settings = require('../../settings');
var mongoose = require('mongoose');

mongoose.connect(settings.db,function(err){
    if(err){
        console.error('connect to %s error: ', settings.db, err.message);
        process.exit(1);
    }
});

//Schemas
require('./articleSchema');
require('./articleTagSchema');
require('./tagSchema');



//Exports Models

exports.Article = mongoose.model('Article');
exports.ArticleTag = mongoose.model('ArticleTag');
exports.Tag = mongoose.model('Tag');