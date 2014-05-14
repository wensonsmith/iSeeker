/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-4-12 - 下午11:54
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ArticleSchema = new Schema({
    title:{type:String},
    content:{type:String},
    url:{type:String},
    reply_count:{type:Number,default:0},
    visit_count:{type:Number,default:0},
    create_at:{type:Date,default:Date.now}
});

mongoose.model('Article',ArticleSchema);