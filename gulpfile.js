var gulp = require("gulp");
var concat = require("gulp-concat");
// var uglify = require("gulp-uglify");
var browserify = require("gulp-browserify");

gulp.task("core", function () {
  gulp.src([
    "./src/_core/*.js"
  ])
    .pipe(concat("Core.js"))
    .pipe(browserify())
    .pipe(gulp.dest("./release/js"));
});

gulp.task("build", ["core"], function () {
  gulp.src([
    "src/modules/global/**.js"
  ])
    .pipe(concat("Global.js"))
    .pipe(browserify())
    .pipe(gulp.dest("./release/js/"));
});

gulp.task("libs", function () {
  // jQuery
  gulp.src("./node_modules/jquery/dist/jquery.min.js")
    .pipe(gulp.dest("./assets/lib/jquery/"));

  // Boostrap
  gulp.src(["./node_modules/bootstrap/dist/css/bootstrap.min.css", "./node_modules/bootstrap/dist/js/bootstrap.min.js"])
    .pipe(gulp.dest("./assets/lib/bootstrap"));

  // Titatoggle
  gulp.src("./node_modules/titatoggle/dist/titatoggle-dist-min.css")
    .pipe(gulp.dest("./assets/lib/titatoggle"));

  // Font awesome
  gulp.src("./node_modules/font-awesome/css/font-awesome.min.css")
    .pipe(gulp.dest("./assets/lib/fontawesome"));
});

gulp.task("default", ["core", "build"], function () {
});
