/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-3-27 - 下午11:46
 */

define(['jquery','codemirror','marked','markdown','gfm','addon/search','addon/active-line','addon/match-highlight'],function($,CodeMirror,marked){

    /**
     * insert '## text'
     */
    CodeMirror.defineExtension("insertTitle", function(num) {
        var pos = this.getCursor();
        pos.ch = 0;
        this.replaceRange("###### ".slice(6 - num), pos, pos);
    });

    /**
     * insert '*text*' '**text**' ...
     */
    CodeMirror.defineExtension("wrapSymbolTag", function(symbol) {
        var selectString = this.getSelection();
        this.replaceSelection(symbol + selectString + symbol);
        var cursor = this.getCursor(false);
        if(selectString == "") cursor.ch = cursor.ch - symbol.length;
        this.setCursor(cursor);
    });

    /**
     * save markdown content
     */
    CodeMirror.defineExtension("saveMarkdownContent", function() {
        function eventFire(el, etype){
            if (el.fireEvent) {
                (el.fireEvent('on' + etype));
            } else {
                var evObj = document.createEvent('Events');
                evObj.initEvent(etype, true, false);
                el.dispatchEvent(evObj);
            }
        }
        var link = document.createElement("a");
        link.download = "markdown.md";
        link.href = "data:application/stream;base64," + $.base64.encode(this.getValue());
        eventFire(link, "click");
    });

    /**
     * tab fast keys
     */
    CodeMirror.defineExtension("tabFastKey", function() {
        var posEnd = this.getCursor("end");
        var posStart = { line: posEnd.line, ch: posEnd.ch - 1}
        switch(this.getRange(posStart, posEnd)){
            case "a":
                this.replaceRange("[Title text](http://sample.com/)", posStart, posEnd);
                break;
            case "i":
                this.replaceRange("![Alt text](https://sample.com/)", posStart, posEnd);
                break;
            default:
                CodeMirror.commands.defaultTab(this);
                break;
        }
    });


    //init the codemirror editor
    return {
        init:function(element){
            var $this = element[0];

            if ( $this.type !== 'textarea' ){
                return false;
            }

            var $textarea = element;
            var $preview  = $(element.data('preview'));

            if(localStorage.markdown != undefined){
                $textarea.val(localStorage.markdown);
            }
            //init marked options
            marked.setOptions({
                breaks:true
            });

            var editor = CodeMirror.fromTextArea($this, {
                mode:             'gfm',
                theme:            "3024-day",
//                lineNumbers:true,
                styleActiveLine:  true,
                matchBrackets:    true,
                lineWrapping:     true,
                autofocus:        false,
                showCursorWhenSelecting:  true,
                highlightSelectionMatches:  true,
                extraKeys: {
                    "Cmd-B"   : function(cm) { cm.wrapSymbolTag("**") },
                    "Ctrl-B"  : function(cm) { cm.wrapSymbolTag("**") },

                    "Cmd-I"   : function(cm) { cm.wrapSymbolTag("*") },
                    "Ctrl-I"  : function(cm) { cm.wrapSymbolTag("*") },

                    "Cmd-U"   : function(cm) { cm.wrapSymbolTag("~~") },
                    "Ctrl-U"  : function(cm) { cm.wrapSymbolTag("~~") },

                    "Cmd-K"   : function(cm) { cm.wrapSymbolTag("`") },
                    "Ctrl-K"  : function(cm) { cm.wrapSymbolTag("`") },

                    "Cmd-1"   : function(cm) { cm.insertTitle(1) },
                    "Ctrl-1"  : function(cm) { cm.insertTitle(1) },

                    "Cmd-2"   : function(cm) { cm.insertTitle(2) },
                    "Ctrl-2"  : function(cm) { cm.insertTitle(2) },

                    "Cmd-3"   : function(cm) { cm.insertTitle(3) },
                    "Ctrl-3"  : function(cm) { cm.insertTitle(3) },

                    "Cmd-4"   : function(cm) { cm.insertTitle(4) },
                    "Ctrl-4"  : function(cm) { cm.insertTitle(4) },

                    "Cmd-5"   : function(cm) { cm.insertTitle(5) },
                    "Ctrl-5"  : function(cm) { cm.insertTitle(5) },

                    "Cmd-6"   : function(cm) { cm.insertTitle(6) },
                    "Ctrl-6"  : function(cm) { cm.insertTitle(6) },

                    "Cmd-S"   : function(cm) { cm.saveMarkdownContent() },
                    "Ctrl-S"  : function(cm) { cm.saveMarkdownContent() },

                    "Tab"   : function(cm) {   cm.tabFastKey()  }
                }
            });

            editor.on("change", function(doc, changeObj) {
                $preview.html(marked(doc.getValue()));
                $textarea.val(doc.getValue());
                localStorage.markdown = doc.getValue();
            });

            editor.on('scroll', function(instance){
                var scrollInfo = instance.getScrollInfo();
                $preview.scrollTop( scrollInfo.top / scrollInfo.height * $preview[0].scrollHeight);
            });

            $preview.html(marked(editor.getValue()));
            localStorage.markdown = editor.getValue();

            return editor;
        }
    }
})