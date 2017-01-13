const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const templateCache = require('gulp-angular-templatecache');
const uncss = require('gulp-uncss');

gulp.task('sass', function(){
  gulp.src('public/stylesheets/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(uncss({
      html: [
        'public/index.html',
        'public/views/add.html',
        'public/views/detail.html',
        'public/views/home.html',
        'public/views/login.html',
        'public/views/signup.html',
      ]
    }))
    .pipe(csso())
    .pipe(gulp.dest('public/stylesheets'))
})

gulp.task('compress', function(){
  gulp.src([
    'public/vendor/angular.js',
    'public/vendor/*.js',
    'public/app.js',
    'public/services/*.js',
    'public/controllers/*.js',
    'public/filters/*.js',
    'public/directives/*.js'
  ])
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public'))
})

gulp.task('templates', function(){
  gulp.src('public/views/**/*.html')
    .pipe(templateCache({ root: 'views', module: 'MyApp' }))
    .pipe(gulp.dest('public'))
})

gulp.task('watch', function(){
  gulp.watch('public/stylesheets/*.scss', ['sass'])
  gulp.watch('public/views/**/*.html', ['templates'])
  gulp.watch(['public/**/*.js', '!public/app.min.js', '!public/templates.js', '!public/vendor'], ['compress'])
})

gulp.task('default', ['sass','templates', 'compress', 'watch'])
