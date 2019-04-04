var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');


// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "distr"
        }
    });

    gulp.watch('distr/**/*').on('change', browserSync.reload);
});


// PUG
gulp.task('compile', function buildHTML() {
    return gulp.src('dev/template/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('distr'))
});


// SASS
gulp.task('sass', function () {
    return gulp.src('dev/styles/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('distr/css'));
});
   
