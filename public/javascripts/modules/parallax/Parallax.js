/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-7-22 - 下午11:41
 */

define(function(){

    var cb;
    var back;      //视差背景
    var fore;      //视差前景
    var sp = {b:0.9,f:0.7};     //视差速度，为一个object 默认 {b:0.9,f:0.7}
    var lastDegree = 0 ;        //模糊程度有木有变化的标志位


    var parallax = function(background,foreground,speed,callback){
        cb = callback;
        back = document.getElementById(background);
        fore = document.getElementById(foreground);
        if(speed){ sp = speed };

        addEvent(window,'scroll',onScroll);
    };

    function onScroll(e){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        back.style.top = scrollTop*sp.b+'px';
        fore.style.top = scrollTop*sp.f+'px';

        scrollBlur(scrollTop,cb);
    }


    function scrollBlur(scrollTop,cb){

        var opacityDegree = Math.ceil(scrollTop/100)/10;
        if(opacityDegree != lastDegree && opacityDegree <= 1){
            cb(opacityDegree*3);
            lastDegree = opacityDegree;
        }
    }


    function addEvent(eventTarget, eventType, eventHandler) {
        if (eventTarget.addEventListener) {
            eventTarget.addEventListener(eventType, eventHandler, false);
        } else {
            if (eventTarget.attachEvent) {
                eventType = "on" + eventType;
                eventTarget.attachEvent(eventType, eventHandler);
            } else {
                eventTarget["on" + eventType] = eventHandler;
            }
        }
    }

    return {parallax:parallax};

});