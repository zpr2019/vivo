
//放大镜

define(["jquery",],function($){
    function magnifyingGlass(){
$(function(){
    $(".detail-img-box1").mouseenter(function(){
        $(".detail-img-middle,.detail-bigImg-k").show();
    }).mouseleave(function(){
        $(".detail-img-middle,.detail-bigImg-k").hide();
    }).mousemove(function(ev){
        var l = ev.pageX - $(".detail-img-box1").offset().left - 100;
        //限制出界
        if(l <= 55){
            l = 55;
        }
        if(l >= 145){
            l = 145;
        }
        var t = ev.pageY - $(".detail-img-box1").offset().top - 100;
        if(t <= 43){
            t = 43;
        }
        if(t >= 260){
            t = 260;
        }
        $(".detail-bigImg-k").css({
            left: l,
            top: t
        })

        //右边的大图片反方向对应放大倍数移动
        $(".detail-middleImg").css({
            left: -2.5 * l,
            top: -2.5 * t
        })
    })

})
    }
    return {
        magnifyingGlass:magnifyingGlass
    }
})

