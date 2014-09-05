    angular.module('SESApp')

    .factory('IDBStore', function($q) {

        var getStore = function (name, keyPath, auto, indexes) {
            var deferred = $q.defer();

            var args = {
                dbVersion: 1,
                storeName: name || 'default',
                keyPath: keyPath || 'id',
                autoIncrement: auto || true,
                onStoreReady: onSuccess,
                onError: onError,
                indexes: indexes || []
            };

            var store = new IDBStore(args);

            function onSuccess() {
                deferred.resolve(store);
            }

            function onError(err) {
                deferred.reject(err);
            }

            return deferred.promise;
        };

        return {
            get: getStore
        };
    });