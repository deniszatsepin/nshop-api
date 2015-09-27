/**
 * Created by Denis Zatsepin <denis@zatsepin.spb.ru>.
 */

var gulp    = require('gulp');
var exit    = require('gulp-exit');
var mocha   = require('gulp-mocha');
var jshint  = require('gulp-jshint');

var paths = {
  scripts: ['src/**/*.js', '*.js', '!src/**/*.test.js'],
  tests: ['test/**/*.test.js', 'src/**/*.test.js']
};

gulp.task('lint', function() {
  return gulp.src(paths.scripts.concat(paths.tests))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test-watch', function() {
  return gulp.src(paths.tests)
    .pipe(mocha({
      reporter: 'nyan'
    }));
});

gulp.task('test', function() {
  gulp
    .tasks['test-watch']
    .fn()
    .pipe(exit());
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint', 'test-watch']);
  gulp.watch(paths.tests, ['lint', 'test-watch']);
});

gulp.task('default', ['watch', 'lint', 'test-watch']);

