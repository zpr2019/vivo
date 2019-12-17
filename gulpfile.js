const gulp = require("gulp");
const sass = require("gulp-sass");

const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");

//.html
gulp.task("copy-html", function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
})

//处理.js代码  第三方的框架，不能压缩不能合并
gulp.task("scripts", function(){
    return gulp.src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})


//处理scss
gulp.task("sass", function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("sassLogin", function(){
    return gulp.src("stylesheet/login.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("login.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("sassList", function(){
    return gulp.src("stylesheet/list.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("list.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("sassShopCart", function(){
    return gulp.src("stylesheet/shoppingCart.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("shoppingCart.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("copy-css", function(){
    return gulp.src("iconfont/iconfont.css")
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

//数据源
gulp.task("data", function(){
    return gulp.src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

//图片

gulp.task("images", function(){
    return gulp.src("images/**/*.{jpg,png}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

//一次性执行多个任务

gulp.task("build", ['copy-html', 'scripts', "copy-css",'sass',"sassLogin","sassList", "sassShopCart",'data', 'images'], function(){
    console.log("项目建立成功");
})



//监听
gulp.task("watch", function(){
    gulp.watch("*.html", ['copy-html']);
    gulp.watch(["*.js", "!gulpfile.js"], ['scripts']);
    gulp.watch("stylesheet/*.scss", ['sass']);
    gulp.watch("stylesheet/*.scss", ["sassLogin"]);
    gulp.watch("stylesheet/*.scss", ["sassList"]);
    gulp.watch("stylesheet/*.scss", ["sassShopCart"]);
    gulp.watch(["*.json", "!package.json"], ['data']);
    gulp.watch("*.{jpg,png}", ['images']);
})

const connect = require("gulp-connect");

gulp.task("server", function(){
    connect.server({
        root: "dist",
        port: 5558,
        livereload: true
    })
})

//设置默认任务
gulp.task("default", ["watch", "server"]);