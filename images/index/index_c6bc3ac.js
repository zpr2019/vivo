$.fn.isOnScreen=function(){if(!this.length)return!1;var t=$(window),i={top:t.scrollTop(),left:t.scrollLeft()};i.right=i.left+t.width(),i.bottom=i.top+t.height();var e=this.offset();return e.right=e.left+this.outerWidth(),e.bottom=e.top+this.outerHeight(),!(i.right<e.left||i.left>e.right||i.bottom<e.top||i.top>e.bottom)},$(function(){function t(t){this.option=$.extend({position:0,interval:6e3},t),this.init()}function i(t){return!t||0>=t?null:{d:parseInt(t/864e5)>9?parseInt(t/864e5):"0"+parseInt(t/864e5),h:parseInt(t/36e5)%24>9?parseInt(t/36e5)%24:"0"+parseInt(t/36e5)%24,m:parseInt(t/6e4)%60>9?parseInt(t/6e4)%60:"0"+parseInt(t/6e4)%60,s:parseInt(t%6e4/1e3)>9?parseInt(t%6e4/1e3):"0"+parseInt(t%6e4/1e3)}}function e(t,i,e){var n=new Image;n.onload=i,n.onerror=e,n.src=t}function n(){var t=navigator.userAgent,i=t.indexOf("compatible")>-1&&t.indexOf("MSIE")>-1,e=t.indexOf("Edge")>-1&&!i,n=t.indexOf("Trident")>-1&&t.indexOf("rv:11.0")>-1;if(i){var a=new RegExp("MSIE (\\d+\\.\\d+);");a.test(t);var o=parseFloat(RegExp.$1);return 7==o?7:8==o?8:9==o?9:10==o?10:6}return e?"edge":n?11:-1}var a=$(document);VIVO_UI.HighLightNav(0);var o={init:function(t){this.timeId=null,this.callbacks=[],this.serverTime=Number(t),this.currentTime=this.serverTime,this.initInterval()},initInterval:function(){var t=this;this.timeId=setInterval(function(){t.currentTime+=1e3,t.fire()},1e3)},addCallback:function(t){this.callbacks.indexOf(t)<0&&this.callbacks.push(t)},removeCallback:function(t){var i=this.callbacks.indexOf(t);i>=0&&this.callbacks.splice(i,1)},fire:function(){if(0!=this.callbacks.length)for(var t=0,i=this.callbacks.length;i>t;t++)this.callbacks[t](this.currentTime)},destoryInterval:function(){clearInterval(this.timeId),this.timeId="",this.callbacks=[],this.serverTime="",this.currentTime=""}},r={init:function(){this.initData()},initData:function(){var t=this;$.ajax({url:webCtx+"/api/channel/getDetail"}).then(function(i){if(0==i.code&&i.data){var e=i.data.timeVo;t.currentTime=e.currentTime,t.startTime=e.startTime,t.endTime=e.endTime,t.nextStartTime=e.nexStartTime,o.init(t.currentTime),o.addCallback(t.countDown),t.initHtml(i.data),t.initSwiper(),t.bindTrackEvent()}else $(".J_promotion-container").empty().hide()})},initHtml:function(t){var i=template("promotionTpl",t);$(".J_promotion-container").html(i).show()},initSwiper:function(){var t=this;this.swiper=new Swiper(".J_promotioin-swiper",{lazy:!0,watchSlidesProgress:!0,watchSlidesVisibility:!0,slidesPerView:4,spaceBetween:10,on:{init:function(){alert(111),console.log(".....")}}}),$(".J_promotion").on("click",".J_swiper-prev",function(){t.swiper.slidePrev()}).on("click",".J_swiper-next",function(){t.swiper.slideNext()})},countDown:function(t){var e=r,n=null,a="",c=$(".J_promotion .J_countdown");if(t<e.startTime)a="开始",n=i(e.startTime-t);else if(t>e.startTime&&t<e.endTime)a="结束",n=i(e.endTime-t);else if(t>=e.endTime)return $(".J_promotion-container").empty().hide(),o.destoryInterval(),e.init();Number(n.d)>0?c.find(".day").text(n.d):c.find(".days").hide(),c.find(".state").text(a),c.find(".hour").text(n.h),c.find(".min").text(n.m),c.find(".sec").text(n.s)},bindTrackEvent:function(){$(".J_promotion").on("click",".J_prod-link",function(){Vtrack.clickStats({cfrom:5020,skuid:$(this).data("id")})}).on("click",".more",function(){Vtrack.clickStats({cfrom:5022})}).on("click",".J_next-Time",function(){Vtrack.clickStats({cfrom:5023})});var t=$(".J_promotion .swiper-slide"),i=new IntersectionObserver(function(t){t.forEach(function(t){if(t.isIntersecting){var i=$(t.target),e="prod"==i.data("type");Vtrack.clickStats(e?{cfrom:5021,skuid:i.data("id")}:{cfrom:5024})}})},{root:$(".J_promotion")[0],rootMargin:"0px -30px"});t.each(function(t,e){i.observe(e)})}};r.init(),$.extend(t.prototype,{init:function(){var t=this,i=this.option.$thumbs.parent().parent()[0];this.time=0,this.option.$thumbs.on("click",function(){var i;t.locked||(i=$(this).index(),t.option.position!==i&&t.goto(i))}),i.onmouseenter=function(){t.stop()},i.onmouseleave=function(){t.start()}},"goto":function(t){var i,e,n,a=this,o=new Image;if(!this.locked){this.locked=!0,this.time=0,i=this.option.$items.eq(t),n=this.option.$items.eq(this.option.position),this.option.$thumbs.removeClass("current").eq(t).addClass("current").end().eq(this.option.position).find(".progress").css("width",0),this.option.position=t,e=i.find("img");var r=e.attr("data-original");r&&(o.onload=function(){e.attr("src",r).removeAttr("data-original")},o.src=r),i.addClass("show").css({opacity:0}).animate({opacity:1},1e3,function(){n.removeClass("current"),i.removeClass("show").addClass("current"),a.locked=!1}),$(".banner").isOnScreen()&&Vtrack.clickStats({cfrom:5116,pageview:"商城首页",position:t+1,name:i.attr("data-name")})}},start:function(){var t=this;this.intervalId=setInterval(function(){t.time+=window.isIE8?100:50,t.time>t.option.interval&&(t.time=t.option.interval),t.option.$thumbs.eq(t.option.position).find(".progress").css("width",100*t.time/t.option.interval+"%"),t.time===t.option.interval&&t.goto((t.option.position+1)%t.option.$thumbs.length)},window.isIE8?100:50)},stop:function(){clearInterval(this.intervalId)}}),function(){var i=$(".banner .img-list").children(),n=$(".banner .thumb-list").children(),a=i.filter(".current")[0];i.find("img[data-original]").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQjYzNEEyOTBGNzQxMUU3OTkwNTlEQkU2NjJGMzVBNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQjYzNEEyQTBGNzQxMUU3OTkwNTlEQkU2NjJGMzVBNyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFCNjM0QTI3MEY3NDExRTc5OTA1OURCRTY2MkYzNUE3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFCNjM0QTI4MEY3NDExRTc5OTA1OURCRTY2MkYzNUE3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+r2fvmQAAABBJREFUeNpi+P//PwNAgAEACPwC/tuiTRYAAAAASUVORK5CYII="),e($(a).find("img").attr("src"),function(){i.length>1&&new t({$items:i,$thumbs:n}).start()},function(){i.length>1&&new t({$items:i,$thumbs:n}).start()})}(),$(".floor .box").each(function(){var t,i,e=$(this);e.on("mouseenter",function(){clearTimeout(i),t=setTimeout(function(){e.addClass("hover")},100)}).on("mouseleave",function(){clearTimeout(t),i=setTimeout(function(){e.removeClass("hover")},300)})}),function(){$(".floor-list").on("click",".color-list li",function(){var t,i,e,n,a,o=$(this);o.hasClass("selected")||(t=o.closest(".box"),i=o.attr("data-img"),n=o.attr("data-href"),e=o.attr("data-price"),e=(Math.floor(1e5*e)/1e5).toFixed(2),o.addClass("selected").siblings().removeClass("selected"),a=t.find(".color-wrapper").prev().attr("href",n).children().eq(0),t.find(".color-wrapper .name").text(o.parent().attr("data-name")+"-"+o.attr("title")),t.find(".prodinfo .price").text(e),a.clone().attr("src",i).css({marginTop:-a.height(),opacity:0,visibility:"visible"}).appendTo(a.parent()).animate({opacity:1},function(){o[0]===o.parent().children(".selected")[0]&&(a.attr("src",i).css("visibility","visible").prev().addClass("hide"),a.nextAll().remove())}))})}(),function(){function t(t){var i=t[0].getBoundingClientRect(),e=o[0].getBoundingClientRect(),r=t.clone().css("visibility","visible").appendTo(document.body);r.css({position:"fixed",zIndex:"9999",left:i.left,top:i.top,width:i.right-i.left,height:i.bottom-i.top}).animate({width:50,height:50,left:(i.left+i.right)/2-25,top:(i.top+i.bottom)/2-25},function(){$(this).dequeue("verticalMove")}).animate({left:e.left},600,"linear").animate({top:e.top},{queue:"verticalMove",duration:600,easing:"easeInQuint",complete:function(){r.remove(),2===++n&&(a.trigger("updateShopcartNum"),o.trigger("click",[!0]))}})}var i,e,n,o=$("#side-bar .shopcart");$(".floor-list").on("click",".putin-shopcart",function(){var r,c=i;void 0!==e&&clearTimeout(e),i=(new Date).getTime(),e=setTimeout(function(){i=void 0},500),void 0===c&&(n=0,r=$(this).parent(),$.ajax({type:"post",url:"/shoppingcart/cartAdd",data:{skuId:r.siblings(".color-list").find(".selected").attr("data-skuid"),num:1,needCheck:1},dataType:"json",success:function(t,i){"success"===i&&200===t.retCode&&2===++n&&(a.trigger("updateShopcartNum"),o.trigger("click",[!0]))}}),t(r.parent().prev().children().last()))})}(),$.ajax({type:"get",dataType:"json",url:webCtx+"/fbApi/v1/bag/index",success:function(t){if(t&&0==t.code&&t.data){var i=window.localStorage.getItem("bagFlag"),e=t.data,a=1,o=e.bagPcUrl.split("/").pop().split("?")[0];"00"==e.bagStatus&&($(document.body).append($("#newbieTpl").html()),$(".dialog-gift .dialog-img").attr("src",IMGHOSTURL+e.bagImg.pcLayerUrl),$(".popup-gift img").attr("src",IMGHOSTURL+e.bagImg.pcFixUrl),1==i&&(a=2,$(".dialog-gift").animate({left:"-100%"},0).find("img"),$(".popup-gift").animate({opacity:1,transform:"scale(1.2)"},1e3,function(){$(".popup-gift").animate({transform:"scale(1.1)"},1e3)})),Vtrack.clickStats({cfrom:"5146",pageview:"商城首页",pkg_id:o,type:a})),$(".dialog-gift .dialog-img").click(function(){window.location.href=e.bagPcUrl+"?source=1",Vtrack.clickStats({pageview:"商城首页",cfrom:5129,pkg_id:o,type:1})}),9==n()?($(".dialog-gift i").on("click",function(){$(".dialog-gift i").hide(),$(".dialog-gift").hide(),$(".popup-gift").show().css({opacity:1}),window.localStorage.setItem("bagFlag","1")}),$(".popup-gift").on("click",function(){$(".dialog-gift i").show(),$(".popup-gift").hide(),$(".dialog-gift").show().css({left:"50%"}),Vtrack.clickStats({pageview:"商城首页",cfrom:5129,pkg_id:o,type:2})})):($(".dialog-gift i").on("click",function(){$(".dialog-gift i").hide(),$(".dialog-gift").removeClass("dGoSmall addg0 dGoBig addg1").addClass("dGoSmall addg0"),window.localStorage.setItem("bagFlag","1"),setTimeout(function(){$(".popup-gift").addClass("pGoBig addp2")},700)}),$(".popup-gift").on("click",function(){$(".dialog-gift i").show(),$(".popup-gift").removeClass("pGoBig addp2").addClass("pGoSmall addp0"),setTimeout(function(){$(".dialog-gift").removeClass("dGoSmall addg0").addClass("dGoBig addg1")},40),Vtrack.clickStats({pageview:"商城首页",cfrom:5129,pkg_id:o,type:2})}))}},error:function(){}})}),$(function(){"undefined"!=typeof ISHOMEHEAD&&ISHOMEHEAD||$(".nav-gb").eq(0).find("a").addClass("current"),Vtrack(function(){this.clickStats({cfrom:5100,pageview:"商城首页",cid:Vtrack.parseQs().cid||Vtrack.getLocalData("vfe-cid")||"",is_done:1}),$(window).on("beforeunload",function(){Vtrack.clickStats({cfrom:5100,pageview:"商城首页",lefttime:+new Date})})},function(){console.warn("失败")}),$("a.logo").on("click",function(){Vtrack.clickStats({cfrom:5111,pageview:"商城首页",name:"商城logo"})}),$("a.help").on("click",function(){Vtrack.clickStats({cfrom:5109,pageview:"商城首页",name:"帮助中心"})}),$(".shopcart-fixbox").on("click",".clearing",function(){Vtrack.clickStats({cfrom:5110,pageview:"商城首页",name:"购物车立即结算"})}),$(".promise a").on("click",function(){var t=$(this).index()+1;Vtrack.clickStats({cfrom:5112,pageview:"商城首页",position:t,name:"信任图标"})}),$(".vvs-agree-item a").on("click",function(){var t=$(this).parent().index()+1;Vtrack.clickStats({cfrom:5112,pageview:"商城首页",position:t,name:"信任图标"})});var t=1;$(window).on("scroll",function(){var i=$(".img-list"),e=i.isOnScreen();if(e||(t=1),e&&t){var n=i.find(".current"),a=n.attr("data-name"),o=n.index()+1;Vtrack.clickStats({cfrom:5116,pageview:"商城首页",position:o,name:a}),t=0}}).trigger("scroll"),$(".img-list li").on("click",function(){var t=$(this).index()+1,i=$.trim($(this).attr("data-name"));Vtrack.clickStats({cfrom:5113,pageview:"商城首页",position:t,name:i})}),$("#side-bar").on("mouseup","li",function(){var t=$(this).attr("data-name"),i=$(this).attr("data-index");Vtrack.clickStats({cfrom:5121,pageview:"商城首页",name:t,position:i})}),$(".more-wrapper").on("click","a",function(){var t=$(this).parent(),i=t.parent().children().length,e=t.index(),n=$.trim(t.text()),a=$.trim(t.closest(".info").find(".subject").text()),o=i-e;Vtrack.clickStats({cfrom:"5120",pageview:"商城首页",name:n,position:o,source:a})});var i=$(".fp .box"),e=Array.apply(null,Array(i.length)).map(function(){return 1});$(window).on("scroll",function(){i.each(function(t){var i=$(this),n=i.isOnScreen();if(n||(e[t]=1),n&&e[t]){var a=$(this).children().eq(0)[0].href;Vtrack.clickStats({cfrom:5115,pageview:"商城首页",position:i.index()+1,name:a}),e[t]=0}})}).trigger("scroll"),$(".fp").on("click","a",function(){var t=this.href;Vtrack.clickStats({pageview:"商城首页",cfrom:5114,name:t,position:$(this).parent().index()+1})});var n=$(".floor").not(".fp").find(".box"),a=Array.apply(null,Array(n.length)).map(function(){return 1});$(window).on("scroll",function(){n.each(function(t){var i=$(this),e=i.isOnScreen();if(e||(a[t]=1),e&&a[t]){var n=$.trim(i.closest(".floor").find(".subject").text()),o=i.children().eq(0).attr("data-name"),r=i.index()+1,c=i.children().eq(0)[0].href.match(/product\/(\w+)\??/i),s=c?c[1]:"";Vtrack.clickStats({cfrom:5117,pageview:"商城首页",goodid:s,position:r,source:n,name:o}),a[t]=0}})}).trigger("scroll"),$(".floor").not(".fp").on("click",'.box a:not(".sellout")',function(){var t=$(this),i=$.trim(t.closest(".floor").find(".subject").text()),e=t.closest(".box").children().eq(0).attr("data-name"),n=t.closest(".box").index()+1,a="5118";if(t.hasClass("putin-shopcart")){a="5119";var o=t.data().spustr.match(/product\/(\w+)\??/i),r=o?o[1]:""}else var o=this.href.match(/product\/(\w+)\??/i),r=o?o[1]:"";Vtrack.clickStats({pageview:"商城首页",cfrom:a,goodid:r,position:n,source:i,name:e})}),$(".category>li").on("mouseenter",function(){"use strict";var t=$(this);$(window).trigger("scroll"),Vtrack.clickStats({pageview:"商城首页",cfrom:5131,category:$.trim(t.find(".category-name").text()),categoryid:t.attr("data-id")})}).on("click",".category-sub a",function(){var t=$(this),i=t.closest(".category>li");Vtrack.clickStats({pageview:"商城首页",cfrom:5132,name:$.trim(t.text()),position:t.parent().index(),category:$.trim(i.find(".category-name").text()),categoryid:i.attr("data-id")})}).on("click",".category-all",function(){"use strict";var t=$(this),i=t.closest(".category>li");Vtrack.clickStats({pageview:"商城首页",cfrom:5133,category:$.trim(i.find(".category-name").text()),categoryid:i.attr("data-id")})}).on("click",".category-product a",function(){"use strict";var t=$(this),i=t.closest(".category>li");Vtrack.clickStats({pageview:"商城首页",cfrom:5134,name:$.trim(t.find("span").text()),goodid:t.parent().attr("data-id"),position:t.parent().index(),category:$.trim(i.find(".category-name").text()),categoryid:i.attr("data-id")})}).on("click",".category-sidebar a",function(){"use strict";var t=$(this),i=t.closest(".category>li");Vtrack.clickStats({pageview:"商城首页",cfrom:5135,banner_url:t.attr("href"),position:t.parent().index(),category:$.trim(i.find(".category-name").text()),categoryid:i.attr("data-id")})})});