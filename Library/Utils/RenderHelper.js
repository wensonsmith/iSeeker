/**
 * Created by Wenson Smith
 * @email wensonsmith@gmail.com
 * @date 2014/3/6 下午 3:45
 */

var preSet = {};

exports.formatDate = function (date,friendly){
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (friendly) {
        var now = new Date();
        var mseconds = -(date.getTime() - now.getTime());
        var time_std = [ 1000, 60 * 1000, 60 * 60 * 1000, 24 * 60 * 60 * 1000 ];
        if (mseconds < time_std[3]) {
            if (mseconds > 0 && mseconds < time_std[1]) {
                return Math.floor(mseconds / time_std[0]).toString() + ' 秒前';
            }
            if (mseconds > time_std[1] && mseconds < time_std[2]) {
                return Math.floor(mseconds / time_std[1]).toString() + ' 分钟前';
            }
            if (mseconds > time_std[2]) {
                return Math.floor(mseconds / time_std[2]).toString() + ' 小时前';
            }
        }
    }

    //month = ((month < 10) ? '0' : '') + month;
    //day = ((day < 10) ? '0' : '') + day;
    hour = ((hour < 10) ? '0' : '') + hour;
    minute = ((minute < 10) ? '0' : '') + minute;
    second = ((second < 10) ? '0': '') + second;

    var thisYear = new Date().getFullYear();
    year = (thisYear === year) ? '' : (year + '-');
    return year + month + '-' + day + ' ' + hour + ':' + minute;
};

exports.setView = function(params,isX){
    if(isX){
        preSet.layout = 'x/partials/header';
        preSet.partials = {sidebar:'x/partials/sidebar',navigation:'x/partials/navigation'};
    }else{
        preSet.layout = 'index/partials/header';
        preSet.partials = {sidebar:'index/partials/sidebar'} ;
    }

    if(typeof params == 'undefined')
        return preSet;
    else
        return  extend(preSet,params,true);
};

exports.setTitle = function(name){
    preSet.title = name;
};

/**
 * 合并两个对象
 * @param o  原对象
 * @param n  新对象
 * @param override  是否覆盖
 */
var extend = function(o,n,override){
    for(var p in n)
        if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))
            o[p]=n[p];
    return o;
};