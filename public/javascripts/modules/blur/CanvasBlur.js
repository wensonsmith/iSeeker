/**
 * Project X - Seeker
 * @author wensonsmith@gmail.com
 * @github https://github.com/wensonsmith/seeker.git
 * @date 14-7-20 - 下午7:42
 */

define(function(){

    var CanvasImage = function(cav,img) {
        this.canvas = document.getElementById(cav);
        this.image = document.getElementById(img);

        this.canvas.width = this.image.width;
        this.canvas.height = this.image.height;

        console.log("W:"+this.canvas.width+"--H:"+this.canvas.height);


        this.context = this.canvas.getContext("2d");

        this.context.drawImage(this.image,0,0)
    };

    CanvasImage.prototype.blur = function(i) {
        this.context.globalAlpha = 0.5;

        for (var y = -i; y <= i; y += 2) {
            for (var x = -i; x <= i; x += 2) {
                this.context.drawImage(this.canvas, x, y)
                if (x >= 0 && y >= 0) {
                    this.context.drawImage(this.canvas, -(x-1), -(y-1))
                }
            }
        }
        this.context.globalAlpha = 1;
    };

    CanvasImage.prototype.scale = function(width,height) {
        this.canvas.style.setProperty("width",width+"px","");
        this.canvas.style.setProperty("height",height+"px","");
    };

    var CanvasBlur = function(canvas,image,blur){
        var CanvasImg = new CanvasImage(canvas,image);
        CanvasImg.blur(blur);
//        CanvasImg.scale(width,height);
    };

    return {
        CanvasBlur : CanvasBlur
    };


});