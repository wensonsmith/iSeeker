/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-7-23 - 下午11:33
 */

define(function(){

   var imageFull = function(wrap,img,callback){
       var wrapper = document.getElementById(wrap);
       var image = document.getElementById(img);

       var wrapperScale = wrapper.height/wrapper.width;
       var imageScale = image.height/image.width;

       if(wrapperScale > imageScale ){
           image.style.height = "100%";
       }else{
           image.style.width = "100%";
       }

       image.style.opacity = 1;

       callback();
   };

    return {imageFull:imageFull};
});