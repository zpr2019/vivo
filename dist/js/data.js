// 主页数据加载
define(["jquery"], function($){
    function download(){
        $.ajax({
            url: "../data/data.json",
            success: function(data){
                //第一部分数据加载
               var firstArr = data.topNav;
                for(var i = 0; i < firstArr.length; i++){
                var node = $(`<li" class="site-navTop-center-first">
                <a href="" class="site-navTop-center-first-a">
                    <span>${firstArr[i].title}</span>
                    <div class="first-box">
                         <ul class="first-box-ul">
                         </ul>
                    </div>
                   
                </a>
                
            </li>`);
            node.appendTo(".site-navTop-center-box");
             //通过循环将子元素进行创建
            for(var j = 0; j < firstArr[i].childs.length; j++){
              var node1 =  $(`
                    <li class="first-box-ul-li">
                        <a href="" class="first-box-ul-a">
                            <img src="${firstArr[i].childs[j].img}" alt="" class="first-box-ul-li-img">
                            <span class="first-box-ul-li-span">${firstArr[i].childs[j].title}</span>
                        </a>
                    </li>
               `);
            node1.appendTo(node.find(".first-box .first-box-ul" ));
            }
         }      
          
         
         //侧边栏数据加载
         var lastArr = data.leftNav;
                for(var l = 0; l < lastArr.length; l++){
                var node3 = $(`<li" class="site-navLeft-left-first">
                <a href="" class="site-navLeft-left-first-span">
                    <span>${lastArr[l].title}</span>
                    <i class="iconfont">&#xe63d;</i>
                    <div class="last-box">
                         <ul class="last-box-ul">
                         </ul>
                    </div>
                   
                </a>
                
            </li>`);
            node3.appendTo(".site-navLeft-left");
             //通过循环将子元素进行创建
             
            for(var m = 0; m < lastArr[l].childs.length; m++){
              var node4 =  $(`
                    <li class="last-box-ul-li">
                        <a href="" class="last-box-ul-a">
                            <img src="${lastArr[l].childs[m].img}" alt="" class="last-box-ul-li-img">
                            <span class="last-box-ul-li-span">${lastArr[l].childs[m].title}</span>
                        </a>
                    </li>
               `);
            node4.appendTo(node3.find(".last-box .last-box-ul" ));
            }
         }  
         /*  //common数据加载
         var commonArr = data.common;
         for(var n = 0; n < commonArr.length; n++){
             var node2 = $`
             <li class="common-box-li">
             <a href="" class="common-box-a">
             <img src="${commonArr[n].img}" alt="" class="common-box-li-img">
             </a>
             </li>`;
         node2.appendTo(".common-box");
         } */    

            }
             
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
    function tabMenu2(){
        $(".site-navLeft-left").on("mouseenter", ".site-navLeft-left-first", function(){
             this.style.display = "block";
            /*  $(this).addClass("site-navTop-center-first").siblings("li").removeClass("site-navTop-center-first"); */
            $(".site-navLeft-left").find("div").eq($(this).index()).show();
        })
        $(".site-navLeft-left").on("mouseleave", ".site-navLeft-left-first", function(){
        /*     this.style.display = "none"; */
           /*  $(this).addClass("site-navTop-center-first").siblings("li").removeClass("site-navTop-center-first"); */
           $(".site-navLeft-left").find("div").eq($(this).index()).hide();
       })
    }
   
    return {
        download: download,
        tabMenu: tabMenu,
        tabMenu2:tabMenu2
    }
})
