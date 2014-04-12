/**
 * Created by Wenson Smith
 * @email wensonsmith@gmail.com
 * @date 2014/3/6 下午 3:45
 */

var preSet = {};

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