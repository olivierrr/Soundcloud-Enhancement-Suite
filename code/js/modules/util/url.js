define({
  build: function(host, params, cb) {
    var url = host + '?';

    for (var p in params) {
      url = url.concat(p + '=' + params[p] + '&');
    }

    // remove trailing & from url
    url = url.slice(0, -1);

    cb(url);
  },

  parseQuery: function(url, callback) {
    var queries = url.split('?')[1].split('&');
    callback(queries);
  }
});
