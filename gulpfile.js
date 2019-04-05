const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');


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
gulp.task('compile:pug', function buildHTML() {
    return gulp.src('dev/template/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('distr'))
});


// SASS
gulp.task('compile:sass', function () {
    return gulp.src('dev/styles/main.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('distr/css'));
});


// SPRITE
gulp.task('sprite', function (cb) {
    var spriteData = gulp.src('dev/images/icons/*.png').pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      cssName: 'sprite.scss'
    }));

    spriteData.img.pipe(gulp.dest('distr/images'));
    spriteData.css.pipe(gulp.dest('dev/styles/global/'));
    cb();
});


// RIMRAF (delete)
gulp.task('clean', function del(cb) {
    return rimraf('distr',cb);
});


// COPY FONTS
gulp.task('copy:fonts',function() {
    return gulp.src('./dev/fonts/**/*')
    .pipe(gulp.dest('distr/fonts'));
});


// COPY IMAGES
gulp.task('copy:images', function() {
    return gulp.src('./dev/images/**/*')
    .pipe(gulp.dest('distr/images'));
});


// COPY
gulp.task('copy', gulp.parallel('copy:fonts','copy:images'));


// WATCHERS
gulp.task('watch', function() {
    gulp.watch('dev/template/**/*.pug', gulp.series('compile:pug'));
    gulp.watch('dev/styles/**/*.scss', gulp.series('compile:sass','autoprefixer'));
})


// autoprefixer
gulp.task('autoprefixer', () =>
    gulp.src('dev/styles/**/*.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('distr/css'))
);


// default
gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('compile:pug','compile:sass','autoprefixer','sprite','copy'),
    gulp.parallel('watch','server')
))





   
