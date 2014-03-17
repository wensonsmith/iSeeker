/**
 * Created by Wenson Smith
 * @email wensonsmith@gmail.com
 * @date 2014/3/6 下午 3:45
 */

var preSet = {};

exports.xParam = function(params){
    preSet.layout = 'partials/x/header';
    preSet.partials = {sidebar:'partials/x/sidebar'};
    if(typeof params == 'undefined')
        return preSet;
    else
        return  extend(params,preSet,true);
}

exports.iParam = function(params){
    preSet.layout = 'partials/header';
    preSet.partials = {sidebar:'partials/sidebar'} ;

    if(typeof params == 'undefined')
        return preSet;
    else
        return  extend(params,preSet,true);
}

exports.setTitle = function(name){
    preSet.title = name;
}

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