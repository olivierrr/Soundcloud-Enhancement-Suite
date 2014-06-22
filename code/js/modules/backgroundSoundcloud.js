define(['staticConfig', 'lib/async', 'jquery'], function(sc, async, $) {
      var get = function(path, params, callback) {
        $.getJSON(sc.soundcloud.api.host + path, params, function(result) {
          callback(result);
        });
      };

      var getAll = function(req, callback, collection) {
        get(req.path, req.params, function accumulate(data) {
          collection = collection.concat(data);
          console.log(data);
          if (data.length === 0) {
            callback(collection, req.store);
          } else {
            req.params.offset += data.length;
            getAll(req, callback, collection);
          }
        });
      };

      return {
        cache: function(reqs, callback) {
          async.eachSeries(reqs, function(req, callback) {
            getAll(req, callback, []);
            callback();
          }, function(err) {
            if (err) console.log(err);
          });
        }
      };
    });
