/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-3-27 - 下午11:46
 */


requirejs.config({
    baseUrl: '/public/javascripts',
    paths: {
        marked:     'components/marked/marked',
        jquery:     'components/jquery/jquery.min',
        domready:   'components/requirejs/domReady',
        codemirror: 'components/codemirror/codemirror',
        markdown:   'components/codemirror/mode/markdown/markdown',
        gfm:        'components/codemirror/mode/gfm/gfm',
        modernizr:  'components/modernizr/modernizr',
        foundation: 'components/foundation/foundation.min',
        highlight:  'components/highlight/highlight.pack'
    },
    map:{
      '*':{
          'addon/active-line':'components/codemirror/addon/selection/active-line',
          'addon/search':'components/codemirror/addon/search/search',
          'addon/match-highlight':'components/codemirror/addon/search/match-highlighter'
      }
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