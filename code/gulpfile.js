var gulp = require('gulp');
var tinylr = require('tiny-lr');

gulp.task('dev', function () {
  var lr = tinylr();
  lr.listen(35729);
  gulp.watch(['manifest.json', './app/**/*.js', './util/**/*.js', "./background/js/background.js", "./background/views/*.html", './assets/css/**/*.css', './app/**/*.html'], function (evt) {
    console.log("Detected change: " + evt.path);
    lr.changed({
      body: {
        files: [evt.path]
      }
    });
  });
});