console.log("加载成功");
//配置当前index.html引入的所有.js文件
require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",
		"parabola": "parabola",//抛物线
		"shoppingCar": "shoppingCar",//购物车
        "banner": "banner",//轮播图
        "total": "total",//合计
        "magnifyingGlass":"magnifyingGlass",//放大镜
        "tabControl":"tabControl"//选项卡
	},
	shim: {
		//设置jquery-cookie依赖于jquery开发的
		"jquery-cookie": ["jquery"],
		//抛物线不支持AMD规范
		"parabola": {
			exports: "_"
		}
	}
})
/* require(["parabola", "shoppingCar"], function(index, banner){
	index.index();
	banner.move(); //让轮播图效果生效
}) */