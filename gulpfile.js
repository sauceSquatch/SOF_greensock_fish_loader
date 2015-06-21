var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

var sassSources = [
  'components/sass/*.sass',
  'components/sass/*.scss'
]

var jsSources = [
  'components/lib/*.js',
  'components/lib/greensock/TweenMax.js',
  'components/lib/greensock/TimelineMax.js',
  'components/lib/greensock/easing/EasePack.js',
  'components/lib/greensock/plugins/CSSPlugin.js',
  'components/scripts/*.js'
];

gulp.task('run_sass', function() {
  gulp.src(sassSources)
    .pipe(sass({style: 'expanded', lineNumbers:true})
      .on('error', gutil.log))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
})

gulp.task('run_js', function() {
  gulp.src(jsSources)
          .pipe(uglify())
          .pipe(concat('script.js'))
          .pipe(gulp.dest('js'))
});

gulp.task('watch', function() {
  var server = livereload();
  gulp.watch(sassSources, ['run_sass']);
  gulp.watch(jsSources, ['run_js']);
  gulp.watch(['js/script.js', 'css/style.css', '*.html'], function(e) {
    server.changed(e.path);
  })
})

gulp.task('default', ['run_sass', 'run_js', 'watch']);
