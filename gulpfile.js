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
    "src/modules/global/**/*.js"
  ])
    .pipe(browserify())
    .pipe(concat("Global.js"))
    .pipe(gulp.dest("./release/js/"));
});
