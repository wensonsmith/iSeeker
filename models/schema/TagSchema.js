/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-4-17 - 下午2:19
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TagSchema = new Schema({
    name:{ type:String },
    article_count:{ type:Number,default:1 },
    create_at:{ type:Date,default:Date.now }
});

mongoose.model('Tag',TagSchema);
