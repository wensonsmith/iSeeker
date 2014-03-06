/**
 * Created by Wenson Smith
 * @email wensonsmith@gmail.com
 * @date 2014/3/6 下午 3:45
 */

exports.xParam = function(params){
    var layout = {layout:'partials/head',partials:{sidebar:'partials/sidebar'}};
    return  extend(params,layout,true);
}

exports.iParam = function(params){
    var layout = {layout:'partials/header',partials:{sidebar:'partials/sidebar'}};
    return  extend(params,layout,true);
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