define(function(){var a=new function(){function k(w){return w.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function u(w){return w.nodeName.toLowerCase()}function i(x,y){var w=x&&x.exec(y);return w&&w.index==0}function s(x){var w=(x.className+" "+(x.parentNode?x.parentNode.className:"")).split(/\s+/);w=w.map(function(y){return y.replace(/^lang(uage)?-/,"")});return w.filter(function(y){return j(y)||y=="no-highlight"})[0]}function p(y,z){var w={};for(var x in y){w[x]=y[x]}if(z){for(var x in z){w[x]=z[x]}}return w}function v(y){var w=[];(function x(z,A){for(var B=z.firstChild;B;B=B.nextSibling){if(B.nodeType==3){A+=B.nodeValue.length}else{if(u(B)=="br"){A+=1}else{if(B.nodeType==1){w.push({event:"start",offset:A,node:B});A=x(B,A);w.push({event:"stop",offset:A,node:B})}}}}return A})(y,0);return w}function r(x,z,D){var y=0;var G="";var A=[];function C(){if(!x.length||!z.length){return x.length?x:z}if(x[0].offset!=z[0].offset){return(x[0].offset<z[0].offset)?x:z}return z[0].event=="start"?x:z}function B(I){function H(J){return" "+J.nodeName+'="'+k(J.value)+'"'}G+="<"+u(I)+Array.prototype.map.call(I.attributes,H).join("")+">"}function F(H){G+="</"+u(H)+">"}function w(H){(H.event=="start"?B:F)(H.node)}while(x.length||z.length){var E=C();G+=k(D.substr(y,E[0].offset-y));y=E[0].offset;if(E==x){A.reverse().forEach(F);do{w(E.splice(0,1)[0]);E=C()}while(E==x&&E.length&&E[0].offset==y);A.reverse().forEach(B)}else{if(E[0].event=="start"){A.push(E[0].node)}else{A.pop()}w(E.splice(0,1)[0])}}return G+k(D.substr(y))}function n(z){function w(A){return(A&&A.source)||A}function x(B,A){return RegExp(w(B),"m"+(z.cI?"i":"")+(A?"g":""))}function y(E,D){if(E.compiled){return}E.compiled=true;E.k=E.k||E.bK;if(E.k){var A={};var F=function(H,G){if(z.cI){G=G.toLowerCase()}G.split(" ").forEach(function(I){var J=I.split("|");A[J[0]]=[H,J[1]?Number(J[1]):1]})};if(typeof E.k=="string"){F("keyword",E.k)}else{Object.keys(E.k).forEach(function(G){F(G,E.k[G])})}E.k=A}E.lR=x(E.l||/\b[A-Za-z0-9_]+\b/,true);if(D){if(E.bK){E.b="\\b("+E.bK.split(" ").join("|")+")\\b"}if(!E.b){E.b=/\B|\b/}E.bR=x(E.b);if(!E.e&&!E.eW){E.e=/\B|\b/}if(E.e){E.eR=x(E.e)}E.tE=w(E.e)||"";if(E.eW&&D.tE){E.tE+=(E.e?"|":"")+D.tE}}if(E.i){E.iR=x(E.i)}if(E.r===undefined){E.r=1}if(!E.c){E.c=[]}var C=[];E.c.forEach(function(G){if(G.v){G.v.forEach(function(H){C.push(p(G,H))})}else{C.push(G=="self"?E:G)}});E.c=C;E.c.forEach(function(G){y(G,E)});if(E.starts){y(E.starts,D)}var B=E.c.map(function(G){return G.bK?"\\.?("+G.b+")\\.?":G.b}).concat([E.tE,E.i]).map(w).filter(Boolean);E.t=B.length?x(B.join("|"),true):{exec:function(G){return null}};E.continuation={}}y(z)}function d(T,M,K,S){function w(V,W){for(var U=0;U<W.c.length;U++){if(i(W.c[U].bR,V)){return W.c[U]}}}function A(V,U){if(i(V.eR,U)){return V}if(V.eW){return A(V.parent,U)}}function B(U,V){return !K&&i(V.iR,U)}function F(W,U){var V=N.cI?U[0].toLowerCase():U[0];return W.k.hasOwnProperty(V)&&W.k[V]}function x(aa,Y,X,W){var U=W?"":c.classPrefix,V='<span class="'+U,Z=X?"":"</span>";V+=aa+'">';return V+Y+Z}function O(){if(!J.k){return k(D)}var U="";var X=0;J.lR.lastIndex=0;var V=J.lR.exec(D);while(V){U+=k(D.substr(X,V.index-X));var W=F(J,V);if(W){I+=W[1];U+=x(W[0],k(V[0]))}else{U+=k(V[0])}X=J.lR.lastIndex;V=J.lR.exec(D)}return U+k(D.substr(X))}function G(){if(J.sL&&!g[J.sL]){return k(D)}var U=J.sL?d(J.sL,D,true,J.continuation.top):f(D);if(J.r>0){I+=U.r}if(J.subLanguageMode=="continuous"){J.continuation.top=U.top}return x(U.language,U.value,false,true)}function R(){return J.sL!==undefined?G():O()}function Q(W,V){var U=W.cN?x(W.cN,"",true):"";if(W.rB){E+=U;D=""}else{if(W.eB){E+=k(V)+U;D=""}else{E+=U;D=V}}J=Object.create(W,{parent:{value:J}})}function H(U,Y){D+=U;if(Y===undefined){E+=R();return 0}var W=w(Y,J);if(W){E+=R();Q(W,Y);return W.rB?0:Y.length}var X=A(J,Y);if(X){var V=J;if(!(V.rE||V.eE)){D+=Y}E+=R();do{if(J.cN){E+="</span>"}I+=J.r;J=J.parent}while(J!=X.parent);if(V.eE){E+=k(Y)}D="";if(X.starts){Q(X.starts,"")}return V.rE?0:Y.length}if(B(Y,J)){throw new Error('Illegal lexeme "'+Y+'" for mode "'+(J.cN||"<unnamed>")+'"')}D+=Y;return Y.length||1}var N=j(T);if(!N){throw new Error('Unknown language: "'+T+'"')}n(N);var J=S||N;var E="";for(var L=J;L!=N;L=L.parent){if(L.cN){E+=x(L.cN,E,true)}}var D="";var I=0;try{var C,z,y=0;while(true){J.t.lastIndex=y;C=J.t.exec(M);if(!C){break}z=H(M.substr(y,C.index-y),C[0]);y=C.index+z}H(M.substr(y));for(var L=J;L.parent;L=L.parent){if(L.cN){E+="</span>"}}return{r:I,value:E,language:T,top:J}}catch(P){if(P.message.indexOf("Illegal")!=-1){return{r:0,value:k(M)}}else{throw P}}}function f(z,y){y=y||c.languages||Object.keys(g);var w={r:0,value:k(z)};var x=w;y.forEach(function(A){if(!j(A)){return}var B=d(A,z,false);B.language=A;if(B.r>x.r){x=B}if(B.r>w.r){x=w;w=B}});if(x.language){w.second_best=x}return w}function h(w){if(c.tabReplace){w=w.replace(/^((<[^>]+>|\t)+)/gm,function(x,A,z,y){return A.replace(/\t/g,c.tabReplace)})}if(c.useBR){w=w.replace(/\n/g,"<br>")}return w}function q(A){var z=c.useBR?A.innerHTML.replace(/\n/g,"").replace(/<br>|<br [^>]*>/g,"\n").replace(/<[^>]*>/g,""):A.textContent;var B=s(A);if(B=="no-highlight"){return}var w=B?d(B,z,true):f(z);var x=v(A);if(x.length){var y=document.createElementNS("http://www.w3.org/1999/xhtml","pre");y.innerHTML=w.value;w.value=r(x,v(y),z)}w.value=h(w.value);A.innerHTML=w.value;A.className+=" hljs "+(!B&&w.language||"");A.result={language:w.language,re:w.r};if(w.second_best){A.second_best={language:w.second_best.language,re:w.second_best.r}}}var c={classPrefix:"hljs-",tabReplace:null,useBR:false,languages:undefined};function t(w){c=p(c,w)}function m(){if(m.called){return}m.called=true;var w=document.querySelectorAll("pre code");Array.prototype.forEach.call(w,q)}function b(){addEventListener("DOMContentLoaded",m,false);addEventListener("load",m,false)}var g={};var o={};function e(w,y){var x=g[w]=y(this);if(x.aliases){x.aliases.forEach(function(z){o[z]=w})}}function l(){return Object.keys(g)}function j(w){return g[w]||g[o[w]]}this.highlight=d;this.highlightAuto=f;this.fixMarkup=h;this.highlightBlock=q;this.configure=t;this.initHighlighting=m;this.initHighlightingOnLoad=b;this.registerLanguage=e;this.listLanguages=l;this.getLanguage=j;this.inherit=p;this.IR="[a-zA-Z][a-zA-Z0-9_]*";this.UIR="[a-zA-Z_][a-zA-Z0-9_]*";this.NR="\\b\\d+(\\.\\d+)?";this.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";this.BNR="\\b(0b[01]+)";this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";this.BE={b:"\\\\[\\s\\S]",r:0};this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE]};this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE]};this.PWM={b:/\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/};this.CLCM={cN:"comment",b:"//",e:"$",c:[this.PWM]};this.CBCM={cN:"comment",b:"/\\*",e:"\\*/",c:[this.PWM]};this.HCM={cN:"comment",b:"#",e:"$",c:[this.PWM]};this.NM={cN:"number",b:this.NR,r:0};this.CNM={cN:"number",b:this.CNR,r:0};this.BNM={cN:"number",b:this.BNR,r:0};this.CSSNM={cN:"number",b:this.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0};this.RM={cN:"regexp",b:/\//,e:/\/[gim]*/,i:/\n/,c:[this.BE,{b:/\[/,e:/\]/,r:0,c:[this.BE]}]};this.TM={cN:"title",b:this.IR,r:0};this.UTM={cN:"title",b:this.UIR,r:0}}();a.registerLanguage("bash",function(c){var b={cN:"variable",v:[{b:/\$[\w\d#@][\w\d_]*/},{b:/\$\{(.*?)\}/}]};var e={cN:"string",b:/"/,e:/"/,c:[c.BE,b,{cN:"variable",b:/\$\(/,e:/\)/,c:[c.BE]}]};var d={cN:"string",b:/'/,e:/'/};return{aliases:["sh","zsh"],l:/-?[a-z\.]+/,k:{keyword:"if then else elif fi for break continue while in do done exit return set declare case esac export exec",literal:"true false",built_in:"printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo",operator:"-ne -eq -lt -gt -f -d -e -s -l -a"},c:[{cN:"shebang",b:/^#![^\n]+sh\s*$/,r:10},{cN:"function",b:/\w[\w\d_]*\s*\(\s*\)\s*\{/,rB:true,c:[c.inherit(c.TM,{b:/\w[\w\d_]*/})],r:0},c.HCM,c.NM,e,d,b]}});a.registerLanguage("coffeescript",function(d){var c={keyword:"in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",literal:"true false null undefined yes no on off",reserved:"case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",built_in:"npm require console print module global window document"};var b="[A-Za-z$_][0-9A-Za-z$_]*";var g=d.inherit(d.TM,{b:b});var f={cN:"subst",b:/#\{/,e:/}/,k:c};var e=[d.BNM,d.inherit(d.CNM,{starts:{e:"(\\s*/)?",r:0}}),{cN:"string",v:[{b:/'''/,e:/'''/,c:[d.BE]},{b:/'/,e:/'/,c:[d.BE]},{b:/"""/,e:/"""/,c:[d.BE,f]},{b:/"/,e:/"/,c:[d.BE,f]}]},{cN:"regexp",v:[{b:"///",e:"///",c:[f,d.HCM]},{b:"//[gim]*",r:0},{b:"/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)"}]},{cN:"property",b:"@"+b},{b:"`",e:"`",eB:true,eE:true,sL:"javascript"}];f.c=e;return{aliases:["coffee","cson","iced"],k:c,c:e.concat([{cN:"comment",b:"###",e:"###"},d.HCM,{cN:"function",b:"("+b+"\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>",e:"[-=]>",rB:true,c:[g,{cN:"params",b:"\\(",rB:true,c:[{b:/\(/,e:/\)/,k:c,c:["self"].concat(e)}]}]},{cN:"class",bK:"class",e:"$",i:/[:="\[\]]/,c:[{bK:"extends",eW:true,i:/[:="\[\]]/,c:[g]},g]},{cN:"attribute",b:b+":",e:":",rB:true,eE:true,r:0}])}});a.registerLanguage("cpp",function(b){var c={keyword:"false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginary",built_in:"std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf"};return{aliases:["c","h","c++","h++"],k:c,i:"</",c:[b.CLCM,b.CBCM,b.QSM,{cN:"string",b:"'\\\\?.",e:"'",i:"."},{cN:"number",b:"\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"},b.CNM,{cN:"preprocessor",b:"#",e:"$",k:"if else elif endif define undef warning error line pragma",c:[{b:'include\\s*[<"]',e:'[>"]',k:"include",i:"\\n"},b.CLCM]},{cN:"stl_container",b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:c,c:["self"]},{b:b.IR+"::"}]}});a.registerLanguage("css",function(b){var c="[a-zA-Z-][a-zA-Z0-9_-]*";var d={cN:"function",b:c+"\\(",rB:true,eE:true,e:"\\("};return{cI:true,i:"[=/|']",c:[b.CBCM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",c:[{cN:"keyword",b:/\S+/},{b:/\s/,eW:true,eE:true,r:0,c:[d,b.ASM,b.QSM,b.CSSNM]}]},{cN:"tag",b:c,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[b.CBCM,{cN:"rule",b:"[^\\s]",rB:true,e:";",eW:true,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:true,i:"[^\\s]",starts:{cN:"value",eW:true,eE:true,c:[d,b.CSSNM,b.QSM,b.ASM,b.CBCM,{cN:"hexcolor",b:"#[0-9A-Fa-f]+"},{cN:"important",b:"!important"}]}}]}]}]}});a.registerLanguage("diff",function(b){return{aliases:["patch"],c:[{cN:"chunk",r:10,v:[{b:/^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/},{b:/^\*\*\* +\d+,\d+ +\*\*\*\*$/},{b:/^\-\-\- +\d+,\d+ +\-\-\-\-$/}]},{cN:"header",v:[{b:/Index: /,e:/$/},{b:/=====/,e:/=====$/},{b:/^\-\-\-/,e:/$/},{b:/^\*{3} /,e:/$/},{b:/^\+\+\+/,e:/$/},{b:/\*{5}/,e:/\*{5}$/}]},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"change",b:"^\\!",e:"$"}]}});a.registerLanguage("http",function(b){return{i:"\\S",c:[{cN:"status",b:"^HTTP/[0-9\\.]+",e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{cN:"request",b:"^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",rB:true,e:"$",c:[{cN:"string",b:" ",e:" ",eB:true,eE:true}]},{cN:"attribute",b:"^\\w",e:": ",eE:true,i:"\\n|\\s|=",starts:{cN:"string",e:"$"}},{b:"\\n\\n",starts:{sL:"",eW:true}}]}});a.registerLanguage("ini",function(b){return{cI:true,i:/\S/,c:[{cN:"comment",b:";",e:"$"},{cN:"title",b:"^\\[",e:"\\]"},{cN:"setting",b:"^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",e:"$",c:[{cN:"value",eW:true,k:"on off true false yes no",c:[b.QSM,b.NM],r:0}]}]}});a.registerLanguage("java",function(c){var b="false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws";return{aliases:["jsp"],k:b,i:/<\//,c:[{cN:"javadoc",b:"/\\*\\*",e:"\\*/",c:[{cN:"javadoctag",b:"(^|\\s)@[A-Za-z]+"}],r:10},c.CLCM,c.CBCM,c.ASM,c.QSM,{bK:"protected public private",e:/[{;=]/,k:b,c:[{cN:"class",bK:"class interface",eW:true,eE:true,i:/[:"\[\]]/,c:[{bK:"extends implements",r:10},c.UTM]},{b:c.UIR+"\\s*\\(",rB:true,c:[c.UTM]}]},c.CNM,{cN:"annotation",b:"@[A-Za-z]+"}]}});a.registerLanguage("javascript",function(b){return{aliases:["js"],k:{keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"},c:[{cN:"pi",b:/^\s*('|")use strict('|")/,r:10},b.ASM,b.QSM,b.CLCM,b.CBCM,b.CNM,{b:"("+b.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[b.CLCM,b.CBCM,b.RM,{b:/</,e:/>;/,r:0,sL:"xml"}],r:0},{cN:"function",bK:"function",e:/\{/,eE:true,c:[b.inherit(b.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,c:[b.CLCM,b.CBCM],i:/["'\(]/}],i:/\[|%/},{b:/\$[(.]/},{b:"\\."+b.IR,r:0}]}});a.registerLanguage("json",function(b){var f={literal:"true false null"};var e=[b.QSM,b.CNM];var d={cN:"value",e:",",eW:true,eE:true,c:e,k:f};var c={b:"{",e:"}",c:[{cN:"attribute",b:'\\s*"',e:'"\\s*:\\s*',eB:true,eE:true,c:[b.BE],i:"\\n",starts:d}],i:"\\S"};var g={b:"\\[",e:"\\]",c:[b.inherit(d,{cN:null})],i:"\\S"};e.splice(e.length,0,c,g);return{c:e,k:f,i:"\\S"}});a.registerLanguage("makefile",function(b){var c={cN:"variable",b:/\$\(/,e:/\)/,c:[b.BE]};return{aliases:["mk","mak"],c:[b.HCM,{b:/^\w+\s*\W*=/,rB:true,r:0,starts:{cN:"constant",e:/\s*\W*=/,eE:true,starts:{e:/$/,r:0,c:[c]}}},{cN:"title",b:/^[\w]+:\s*$/},{cN:"phony",b:/^\.PHONY:/,e:/$/,k:".PHONY",l:/[\.\w]+/},{b:/^\t+/,e:/$/,c:[b.QSM,c]}]}});a.registerLanguage("xml",function(b){var d="[A-Za-z0-9\\._:-]+";var e={b:/<\?(php)?(?!\w)/,e:/\?>/,sL:"php",subLanguageMode:"continuous"};var c={eW:true,i:/</,r:0,c:[e,{cN:"attribute",b:d,r:0},{b:"=",r:0,c:[{cN:"value",v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s\/>]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xsl","plist"],cI:true,c:[{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[c],starts:{e:"</style>",rE:true,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[c],starts:{e:"<\/script>",rE:true,sL:"javascript"}},{b:"<%",e:"%>",sL:"vbscript"},e,{cN:"pi",b:/<\?\w+/,e:/\?>/,r:10},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:"[^ /><]+",r:0},c]}]}});a.registerLanguage("markdown",function(b){return{aliases:["md","mkdown","mkd"],c:[{cN:"header",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"blockquote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"`.+?`"},{b:"^( {4}|\t)",e:"$",r:0}]},{cN:"horizontal_rule",b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].+?[\\)\\]]",rB:true,c:[{cN:"link_label",b:"\\[",e:"\\]",eB:true,rE:true,r:0},{cN:"link_url",b:"\\]\\(",e:"\\)",eB:true,eE:true},{cN:"link_reference",b:"\\]\\[",e:"\\]",eB:true,eE:true}],r:10},{b:"^\\[.+\\]:",e:"$",rB:true,c:[{cN:"link_reference",b:"\\[",e:"\\]",eB:true,eE:true},{cN:"link_url",b:"\\s",e:"$"}]}]}});a.registerLanguage("nginx",function(d){var c={cN:"variable",v:[{b:/\$\d+/},{b:/\$\{/,e:/}/},{b:"[\\$\\@]"+d.UIR}]};var b={eW:true,l:"[a-z/_]+",k:{built_in:"on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"},r:0,i:"=>",c:[d.HCM,{cN:"string",c:[d.BE,c],v:[{b:/"/,e:/"/},{b:/'/,e:/'/}]},{cN:"url",b:"([a-z]+):/",e:"\\s",eW:true,eE:true},{cN:"regexp",c:[d.BE,c],v:[{b:"\\s\\^",e:"\\s|{|;",rE:true},{b:"~\\*?\\s+",e:"\\s|{|;",rE:true},{b:"\\*(\\.[a-z\\-]+)+"},{b:"([a-z\\-]+\\.)+\\*"}]},{cN:"number",b:"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"},{cN:"number",b:"\\b\\d+[kKmMgGdshdwy]*\\b",r:0},c]};return{aliases:["nginxconf"],c:[d.HCM,{b:d.UIR+"\\s",e:";|{",rB:true,c:[{cN:"title",b:d.UIR,starts:b}],r:0}],i:"[^\\s\\}]"}});a.registerLanguage("objectivec",function(b){var e={keyword:"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign self synchronized id nonatomic super unichar IBOutlet IBAction strong weak @private @protected @public @try @property @end @throw @catch @finally @synthesize @dynamic @selector @optional @required",literal:"false true FALSE TRUE nil YES NO NULL",built_in:"NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection UIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"};var d=/[a-zA-Z@][a-zA-Z0-9_]*/;var c="@interface @class @protocol @implementation";return{aliases:["m","mm","objc","obj-c"],k:e,l:d,i:"</",c:[b.CLCM,b.CBCM,b.CNM,b.QSM,{cN:"string",b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"},{cN:"preprocessor",b:"#import",e:"$",c:[{cN:"title",b:'"',e:'"'},{cN:"title",b:"<",e:">"}]},{cN:"preprocessor",b:"#",e:"$"},{cN:"class",b:"("+c.split(" ").join("|")+")\\b",e:"({|$)",eE:true,k:c,l:d,c:[b.UTM]},{cN:"variable",b:"\\."+b.UIR,r:0}]}});a.registerLanguage("perl",function(d){var e="getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when";var g={cN:"subst",b:"[$@]\\{",e:"\\}",k:e};var h={b:"->{",e:"}"};var b={cN:"variable",v:[{b:/\$\d/},{b:/[\$\%\@](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/},{b:/[\$\%\@][^\s\w{]/,r:0}]};var f={cN:"comment",b:"^(__END__|__DATA__)",e:"\\n$",r:5};var i=[d.BE,g,b];var c=[b,d.HCM,f,{cN:"comment",b:"^\\=\\w",e:"\\=cut",eW:true},h,{cN:"string",c:i,v:[{b:"q[qwxr]?\\s*\\(",e:"\\)",r:5},{b:"q[qwxr]?\\s*\\[",e:"\\]",r:5},{b:"q[qwxr]?\\s*\\{",e:"\\}",r:5},{b:"q[qwxr]?\\s*\\|",e:"\\|",r:5},{b:"q[qwxr]?\\s*\\<",e:"\\>",r:5},{b:"qw\\s+q",e:"q",r:5},{b:"'",e:"'",c:[d.BE]},{b:'"',e:'"'},{b:"`",e:"`",c:[d.BE]},{b:"{\\w+}",c:[],r:0},{b:"-?\\w+\\s*\\=\\>",c:[],r:0}]},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\/\\/|"+d.RSR+"|\\b(split|return|print|reverse|grep)\\b)\\s*",k:"split return print reverse grep",r:0,c:[d.HCM,f,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[d.BE],r:0}]},{cN:"sub",bK:"sub",e:"(\\s*\\(.*?\\))?[;{]",r:5},{cN:"operator",b:"-\\w\\b",r:0}];g.c=c;h.c=c;return{aliases:["pl"],k:e,c:c}});a.registerLanguage("php",function(c){var f={cN:"variable",b:"\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*"};var b={cN:"preprocessor",b:/<\?(php)?|\?>/};var d={cN:"string",c:[c.BE,b],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},c.inherit(c.ASM,{i:null}),c.inherit(c.QSM,{i:null})]};var e={v:[c.BNM,c.CNM]};return{aliases:["php3","php4","php5","php6"],cI:true,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[c.CLCM,c.HCM,{cN:"comment",b:"/\\*",e:"\\*/",c:[{cN:"phpdoc",b:"\\s@[A-Za-z]+"},b]},{cN:"comment",b:"__halt_compiler.+?;",eW:true,k:"__halt_compiler",l:c.UIR},{cN:"string",b:"<<<['\"]?\\w+['\"]?$",e:"^\\w+;",c:[c.BE]},b,f,{cN:"function",bK:"function",e:/[;{]/,eE:true,i:"\\$|\\[|%",c:[c.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",f,c.CBCM,d,e]}]},{cN:"class",bK:"class interface",e:"{",eE:true,i:/[:\(\$"]/,c:[{bK:"extends implements",r:10},c.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[c.UTM]},{bK:"use",e:";",c:[c.UTM]},{b:"=>"},d,e]}});a.registerLanguage("python",function(b){var g={cN:"prompt",b:/^(>>>|\.\.\.) /};var c={cN:"string",c:[b.BE],v:[{b:/(u|b)?r?'''/,e:/'''/,c:[g],r:10},{b:/(u|b)?r?"""/,e:/"""/,c:[g],r:10},{b:/(u|r|ur)'/,e:/'/,r:10},{b:/(u|r|ur)"/,e:/"/,r:10},{b:/(b|br)'/,e:/'/},{b:/(b|br)"/,e:/"/},b.ASM,b.QSM]};var e={cN:"number",r:0,v:[{b:b.BNR+"[lLjJ]?"},{b:"\\b(0o[0-7]+)[lLjJ]?"},{b:b.CNR+"[lLjJ]?"}]};var f={cN:"params",b:/\(/,e:/\)/,c:["self",g,e,c]};var d={e:/:/,i:/[${=;\n]/,c:[b.UTM,f]};return{aliases:["py","gyp"],k:{keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",built_in:"Ellipsis NotImplemented"},i:/(<\/|->|\?)/,c:[g,e,c,b.HCM,b.inherit(d,{cN:"function",bK:"def",r:10}),b.inherit(d,{cN:"class",bK:"class"}),{cN:"decorator",b:/@/,e:/$/},{b:/\b(print|exec)\(/}]}});a.registerLanguage("ruby",function(g){var k="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?";var j="and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor";var c={cN:"yardoctag",b:"@[A-Za-z]+"};var d={cN:"value",b:"#<",e:">"};var l={cN:"comment",v:[{b:"#",e:"$",c:[c]},{b:"^\\=begin",e:"^\\=end",c:[c],r:10},{b:"^__END__",e:"\\n$"}]};var e={cN:"subst",b:"#\\{",e:"}",k:j};var f={cN:"string",c:[g.BE,e],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:"%[qw]?\\(",e:"\\)"},{b:"%[qw]?\\[",e:"\\]"},{b:"%[qw]?{",e:"}"},{b:"%[qw]?<",e:">"},{b:"%[qw]?/",e:"/"},{b:"%[qw]?%",e:"%"},{b:"%[qw]?-",e:"-"},{b:"%[qw]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}]};var b={cN:"params",b:"\\(",e:"\\)",k:j};var i=[f,d,l,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[g.inherit(g.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{cN:"inheritance",b:"<\\s*",c:[{cN:"parent",b:"("+g.IR+"::)?"+g.IR}]},l]},{cN:"function",bK:"def",e:" |$|;",r:0,c:[g.inherit(g.TM,{b:k}),b,l]},{cN:"constant",b:"(::)?(\\b[A-Z]\\w*(::)?)+",r:0},{cN:"symbol",b:":",c:[f,{b:k}],r:0},{cN:"symbol",b:g.UIR+"(\\!|\\?)?:",r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{cN:"variable",b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{b:"("+g.RSR+")\\s*",c:[d,l,{cN:"regexp",c:[g.BE,e],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}],r:0}];e.c=i;b.c=i;var h=[{r:1,cN:"output",b:"^\\s*=> ",e:"$",rB:true,c:[{cN:"status",b:"^\\s*=>"},{b:" ",e:"$",c:i}]},{r:1,cN:"input",b:"^[^ ][^=>]*>+ ",e:"$",rB:true,c:[{cN:"prompt",b:"^[^ ][^=>]*>+"},{b:" ",e:"$",c:i}]}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:j,c:h.concat(i)}});a.registerLanguage("sql",function(b){var c={cN:"comment",b:"--",e:"$"};return{cI:true,i:/[<>]/,c:[{cN:"operator",bK:"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate savepoint release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup",e:/;/,eW:true,k:{keyword:"abs absolute acos action add adddate addtime aes_decrypt aes_encrypt after aggregate all allocate alter analyze and any are as asc ascii asin assertion at atan atan2 atn2 authorization authors avg backup before begin benchmark between bin binlog bit_and bit_count bit_length bit_or bit_xor both by cache call cascade cascaded case cast catalog ceil ceiling chain change changed char_length character_length charindex charset check checksum checksum_agg choose close coalesce coercibility collate collation collationproperty column columns columns_updated commit compress concat concat_ws concurrent connect connection connection_id consistent constraint constraints continue contributors conv convert convert_tz corresponding cos cot count count_big crc32 create cross cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime data database databases datalength date_add date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts datetimeoffsetfromparts day dayname dayofmonth dayofweek dayofyear deallocate declare decode default deferrable deferred degrees delayed delete des_decrypt des_encrypt des_key_file desc describe descriptor diagnostics difference disconnect distinct distinctrow div do domain double drop dumpfile each else elt enclosed encode encrypt end end-exec engine engines eomonth errors escape escaped event eventdata events except exception exec execute exists exp explain export_set extended external extract fast fetch field fields find_in_set first first_value floor flush for force foreign format found found_rows from from_base64 from_days from_unixtime full function get get_format get_lock getdate getutcdate global go goto grant grants greatest group group_concat grouping grouping_id gtid_subset gtid_subtract handler having help hex high_priority hosts hour ident_current ident_incr ident_seed identified identity if ifnull ignore iif ilike immediate in index indicator inet6_aton inet6_ntoa inet_aton inet_ntoa infile initially inner innodb input insert install instr intersect into is is_free_lock is_ipv4 is_ipv4_compat is_ipv4_mapped is_not is_not_null is_used_lock isdate isnull isolation join key kill language last last_day last_insert_id last_value lcase lead leading least leaves left len lenght level like limit lines ln load load_file local localtime localtimestamp locate lock log log10 log2 logfile logs low_priority lower lpad ltrim make_set makedate maketime master master_pos_wait match matched max md5 medium merge microsecond mid min minute mod mode module month monthname mutex name_const names national natural nchar next no no_write_to_binlog not now nullif nvarchar oct octet_length of old_password on only open optimize option optionally or ord order outer outfile output pad parse partial partition password patindex percent_rank percentile_cont percentile_disc period_add period_diff pi plugin position pow power pragma precision prepare preserve primary prior privileges procedure procedure_analyze processlist profile profiles public publishingservername purge quarter query quick quote quotename radians rand read references regexp relative relaylog release release_lock rename repair repeat replace replicate reset restore restrict return returns reverse revoke right rlike rollback rollup round row row_count rows rpad rtrim savepoint schema scroll sec_to_time second section select serializable server session session_user set sha sha1 sha2 share show sign sin size slave sleep smalldatetimefromparts snapshot some soname soundex sounds_like space sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sql_variant_property sqlstate sqrt square start starting status std stddev stddev_pop stddev_samp stdev stdevp stop str str_to_date straight_join strcmp string stuff subdate substr substring subtime subtring_index sum switchoffset sysdate sysdatetime sysdatetimeoffset system_user sysutcdatetime table tables tablespace tan temporary terminated tertiary_weights then time time_format time_to_sec timediff timefromparts timestamp timestampadd timestampdiff timezone_hour timezone_minute to to_base64 to_days to_seconds todatetimeoffset trailing transaction translation trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse ucase uncompress uncompressed_length unhex unicode uninstall union unique unix_timestamp unknown unlock update upgrade upped upper usage use user user_resources using utc_date utc_time utc_timestamp uuid uuid_short validate_password_strength value values var var_pop var_samp variables variance varp version view warnings week weekday weekofyear weight_string when whenever where with work write xml xor year yearweek zon",literal:"true false null",built_in:"array bigint binary bit blob boolean char character date dec decimal float int integer interval number numeric real serial smallint varchar varying int8 serial8 text"},c:[{cN:"string",b:"'",e:"'",c:[b.BE,{b:"''"}]},{cN:"string",b:'"',e:'"',c:[b.BE,{b:'""'}]},{cN:"string",b:"`",e:"`",c:[b.BE]},b.CNM,b.CBCM,c]},b.CBCM,c]}});return a});