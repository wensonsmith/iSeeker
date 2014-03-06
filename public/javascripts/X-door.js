/**
 * Created by Wenson Smith
 * @email wensonsmith@gmail.com
 * @date 2014/3/6 下午 5:06
 */

/**Initialize Cube Login**/
var cubeInit = function(element){
    element.dragsort({
        dragSelector: "div",
        dragBetween: false,
        placeHolderTemplate: "<li class='placeHolder'><div></div></li>"
    });
}

cubeInit($('#cube-unlock'));