
//放大镜

define(["jquery",],function($){
    function magnifyingGlass(){

    }
    return {
        magnifyingGlass:magnifyingGlass
    }
})

/* $(function(){
    $("#small").mouseenter(function(){
        $("#big,#mark").show();
    }).mouseleave(function(){
        $("#big,#mark").hide();
    }).mousemove(function(ev){
        var l = ev.pageX - $("#small").offset().left - 100;
        //限制出界
        if(l <= 0){
            l = 0;
        }
        if(l >= 300){
            l = 300;
        }
        var t = ev.pageY - $("#small").offset().top - 100;
        if(t <= 0){
            t = 0;
        }
        if(t >= 529){
            t = 529;
        }
        $("#mark").css({
            left: l,
            top: t
        })

        //右边的大图片反方向对应放大倍数移动
        $("#big img").css({
            left: -2 * l,
            top: -2 * t
        })
    })

}) */