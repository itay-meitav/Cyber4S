const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Converts scss to css
gulp.task('scss', () => {
	return gulp.src('./src/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./dist'));
});
// Transfers index
gulp.task('index', () => {
	return gulp.src(['./src/*.html'])
		.pipe(gulp.dest('./dist'));
});
// Watch scss files
gulp.task('watch-scss', () => {
	return gulp.watch('./src/**/*.scss', gulp.series('scss'));
});
// Watch html files
gulp.task('watch-html', () => {
	return gulp.watch('./src/*.html', gulp.series('index'));
});

gulp.task('default', gulp.series(
	'scss',
	'index',
	gulp.parallel(
		'watch-scss', 'watch-html'),
));