const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const ts = require("gulp-typescript");

// Typescript task
 gulp.task("ts", () => { 
  return gulp.src("./TODO.ts")
  .pipe (tsProject())
  .pipe (gulp.dest("./result/"));
 });

// Converts scss to css
gulp.task('scss', () => {
  return gulp.src('./styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('.'));
});

// Browser Sync
gulp.task('browser-sync', () => {
  browserSync.init({
    browser: 'Google Chrome',
    port: 8200,
    server: { baseDir: '.' },
    directory: true,
    notify: false
  });
});

// Browser Sync live reload
gulp.task('browser-sync-watch', () => {
  gulp.watch('./styles.css').on('change', browserSync.reload);
  gulp.watch('./chess-JS.js').on('change', browserSync.reload);
  gulp.watch('./JS-chess.html').on('change', browserSync.reload);
});

// Watch scss files
gulp.task('watch-scss', () => {
  return gulp.watch('./styles.scss', gulp.series('scss'));
});

// Run all together
gulp.task('default', gulp.series(
  'scss',
  gulp.parallel('browser-sync', 'browser-sync-watch', 'watch-scss'),
  cb => cb()
));
