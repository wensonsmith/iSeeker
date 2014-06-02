/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-4-17 - 下午2:19
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var MappingSchema = new Schema({
    article_id:{ type:ObjectId },
    tag_id:{ type: ObjectId, ref: 'Tag' },
    create_at:{ type:String,default:Date }
});

mongoose.model('Mapping',MappingSchema);