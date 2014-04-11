/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-3-27 - 下午11:46
 */


requirejs.config({
    baseUrl: 'javascripts',
    paths: {
        marked:     'components/marked/marked',
        jquery:     'components/jquery/jquery.min',
        domready:   'components/requirejs/domReady',
        codemirror: 'components/codemirror/codemirror',
        modernizr:  'components/modernizr/modernizr',
        foundation: 'components/foundation/foundation.min'
    },
    shim: {
        'jquery.dragsort':{
            deps:['jquery']
        },

        'foundation':{
            deps:['jquery','modernizr']
        }
    },
    urlArgs: "bust=" +  (new Date()).getTime()

});


require(['app'],function(app){
    app.init();
})