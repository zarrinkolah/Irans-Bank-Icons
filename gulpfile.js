var gulp = require("gulp");
var less = require("gulp-less");
let cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var runSequence = require("run-sequence");

gulp.task("less", function() {
  return gulp
    .src("./less/bank.less") // only compile the entry file
    .pipe(less())
    .pipe(gulp.dest("./dist"));
});

gulp.task("minifyCSS", () => {
  return gulp
    .src(["dist/*.css", "!dist/*.min.css"])
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist"));
});

gulp.task("compile", function() {
  runSequence("less", "minifyCSS");
});

gulp.task("watch", function() {
  runSequence(
    "less",
    "minifyCSS",
    () => gulp.watch("./less/bank.less", ["compile"]) // Watch bank.less file, then run the less task
  );
});

gulp.task("do", ["watch"]); // Default will run the 'entry' watch task
