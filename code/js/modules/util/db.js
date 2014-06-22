define(['../staticConfig', 'lib/async'], function(sc, async) {
  var db;
  return {
    open: function() {
      var request = indexedDB.open("se-suite", 2);
      request.onerror = function(event) {
        alert("Why didn't you allow my web app to use IndexedDB?!");
      };
      request.onsuccess = function(event) {
        db = request.result;
      };

      request.onupgradeneeded = function(event) {
      	db = event.target.result;

      	var objectStore = db.createObjectStore('following', { keyPath: 'user_id'});
      	objectStore.createIndex('username', 'username', { unique: true });
      	objectStore = db.createObjectStore('favorites', { keyPath: 'id'});
      	objectStore.createIndex('user_id', {unique: false});
      	objectStore.createIndex('')
      };
    },

    save: function(collection, store) {
      console.log(db);
      var objectStore = db.transaction(store, "readwrite").objectStore(store);

      var temp;

      async.each(collection, function(item, callback) {
        callback();
      }, function(err) {
        if (err) {
          console.log('Error');
        }
      });
    }
  };
});
