var gulp = require('gulp');
var tinylr = require('tiny-lr');

gulp.task('dev', function () {
  var lr = tinylr();
  lr.listen(35729);
  gulp.watch(['manifest.json', './js/**/*.js', './css/**/*.css', './html/**/*.html'], function (evt) {
    console.log("Detected change: " + evt.path);
    lr.changed({
      body: {
        files: [evt.path]
      }
    });
  });
});