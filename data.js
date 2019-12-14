// 主页数据加载
define(["jquery"], function($){
    function download(){
        $.ajax({
            url: "../data/data.json",
            success: function(arr){
                //第一部分数据加载
                for(var i = 0; i < arr.length; i++){
                var node = $(`<li" class="site-navTop-center-first">
                <a href="" class="site-navTop-center-first-a">
                    <span>${arr[i].title}</span>
                   
                </a>
                
            </li>`)
            node.appendTo(".site-navTop-center-box");
             //通过循环将子元素进行创建
            for(var j = 0; j < arr[i].childs.length; j++){
                $(`<div class="first-box">
                <ul class="first-box-ul">
                    <li class="first-box-ul-li">
                        <a href="" class="first-box-ul-a">
                            <img src="${arr[i].childs[j].img}" alt="" class="first-box-ul-li-img">
                            <span class="first-box-ul-li-span">${arr[i].childs[j].title}</span>
                        </a>
                    </li>
                </ul>
            </div>`).appendTo(".site-navTop-center-first ");
            }
        }         
            }
             //侧边栏数据加载
        })
    }

    //通过事件委托添加切换函数
    function tabMenu(){
        $(".site-navTop-center-box").on("mouseenter", ".site-navTop-center-first", function(){
             this.style.display = "block";
            /*  $(this).addClass("site-navTop-center-first").siblings("li").removeClass("site-navTop-center-first"); */
            $(".site-navTop-center-box").find("div").eq($(this).index()).show();
        })
        $(".site-navTop-center-box").on("mouseleave", ".site-navTop-center-first", function(){
        /*     this.style.display = "none"; */
           /*  $(this).addClass("site-navTop-center-first").siblings("li").removeClass("site-navTop-center-first"); */
           $(".site-navTop-center-box").find("div").eq($(this).index()).hide();
       })
    }
   
    return {
        download: download,
        tabMenu: tabMenu
    }
})
