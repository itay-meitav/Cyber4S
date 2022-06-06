const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const ts = require("gulp-typescript");
const tsconfig = require("./tsconfig.json");



// Removes previous result
gulp.task("start", () => {
  return gulp.src("./result/", { allowEmpty: true });
});

// Converts ts to js
gulp.task("ts", () => {
  return gulp
      .src("./*.ts")
      .pipe(ts(tsconfig.compilerOptions))
      .pipe(gulp.dest("./result/"));
});


// Converts scss to css
gulp.task("scss", () => {
  return gulp.src("./styles.scss").pipe(sass()).pipe(gulp.dest("."));
});


// Browser Sync
gulp.task("browser-sync", () => {
  browserSync.init({
    browser: "google-chrome",
    port: 8200,
    server: { baseDir: "." },
    directory: true,
    notify: false,
  });
});

// Browser Sync live reload
gulp.task("browser-sync-watch", () => {
  gulp.watch("./styles.css").on("change", browserSync.reload);
  gulp.watch("./result/app.js").on("change", browserSync.reload);
  gulp.watch("./index.html").on("change", browserSync.reload);
});

// Watch scss files
gulp.task("watch-scss", () => {
  return gulp.watch("./styles.scss", gulp.series("scss"));
});

// Watch ts files
gulp.task("watch-ts", () => {
  return gulp.watch("./*.ts", gulp.series("ts"));
});

// Watch html files
gulp.task("watch-html", () => {
  return gulp.watch("./index.html");
});

// Run all together
gulp.task(
  "default",
  gulp.series(
      // "start",
      "ts",
      "scss",
      gulp.parallel(
          "browser-sync",
          "browser-sync-watch",
          "watch-scss",
          "watch-html",
          "watch-ts"
      ),
      (cb) => cb()
  )
);

//////////////////
//  TESTS
/////////////////

gulp.task("jest", function () {
  return gulp.src("tests").pipe(
    jest({
      preprocessorIgnorePatterns: ["<rootDir>/node_modules/"],
      automock: false,
    })
  );
});

// Watch test files
gulp.task("watch-jest", () => {
  return gulp.watch("./*.test.ts", gulp.series("jest"));
});

gulp.task("test", gulp.series("jest", "watch-jest"));
