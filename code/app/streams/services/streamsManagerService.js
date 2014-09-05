    angular.module('SESApp')

    /* Stream Manager Service */
    .factory('streamsManagerService', ['$q', 'IDBStore',
        function($q, IDBStore) {

            function openStore() {
                return IDBStore.get('streams', 'id', true, [{
                    name: 'name',
                    keyPath: 'name',
                    unique: true
                }]);
            }

            /**
             * Add a stream to the store.
             * @param {[type]} stream [description]
             */
            function create(stream) {
                var deferred = $q.defer();

                openStore().then(addToStore, err);

                function addToStore(store) {
                    store.put(stream, success, err);
                }

                function success(tester) {
                    deferred.resolve();
                }

                function err(reason) {
                    deferred.reject(reason);
                }

                return deferred.promise;
            }

            /**
             * Get all streams from the store.
             * @return {[type]} [description]
             */
            function getAll() {
                var deferred = $q.defer();

                openStore().then(getStreamData);

                function getStreamData(store) {
                    store.getAll(success, error);
                }

                function success(streams) {
                    deferred.resolve(streams);
                }

                function error(reason) {
                    deferred.reject(reason);
                }

                return deferred.promise;
            }

            /**
             * Get names of all user's streams.
             * @return {[type]} [description]
             */
            function getAllNames() {
                getAll().then(getNames, error);

                function getNames(streams) {
                    return streams.map(function get(stream) { return stream.name; });
                }

                function error(reason) {

                }
            }

            var activeStream = [];

            return {
                getAll: getAll,

                create: create
            };

        }
    ]);
