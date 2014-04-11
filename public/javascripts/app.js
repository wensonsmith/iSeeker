/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-3-27 - 下午11:46
 */


define(function(require){

    var $ = require('jquery');
    var modernizr  = require('modernizr');
    var foundation = require('foundation');

    return {
        init: function() {
            $(document).foundation();
        }
    }
})