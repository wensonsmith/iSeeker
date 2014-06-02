/**
 * Created by Administrator on 2013/11/13.
 */

var settings = require('../../settings');
var mongoose = require('mongoose');

mongoose.connect(settings.db);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'Connection Error:'));
db.once('open',function callback(){
    console.log("Connection OK");
});

//Schemas
require('./ArticleSchema');
require('./MappingSchema');
require('./TagSchema');



//Exports Models

exports.Article = mongoose.model('Article');
exports.Mapping = mongoose.model('Mapping');
exports.Tag = mongoose.model('Tag');