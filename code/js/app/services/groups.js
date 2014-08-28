    angular.module('SESApp')

    /* Group Factory Service */
    .factory('Groups', ['$q', 'IDBStore',
        function($q, IDBStore) {

            function getStore() {
                return IDBStore.get('groups', 'id', true, [{
                    name: 'name',
                    keyPath: 'name',
                    unique: true
                }]);
            }

            /**
             * Add a group to the store.
             * @param {[type]} group [description]
             */
            function create(group) {
                getStore().then(addToStore, err);

                function addToStore(store) {
                    store.put(group, null, err);
                }

                function err(reason) {
                    // console.log(reason);
                }
            }

            /**
             * Get all group data from the store.
             * @return {[type]} [description]
             */
            function getAll() {
                var deferred = $q.defer();

                getStore().then(getFromStore);

                function getFromStore(store) {
                    store.getAll(success, error);
                }

                function success(groups) {
                    deferred.resolve(groups);
                }

                function error(reason) {
                    deferred.reject(reason);
                }

                return deferred.promise;
            }

            /**
             * Get names of all of the groups in the store.
             * @return {[type]} [description]
             */
            function getAllNames() {
                getAll().then(getNames)
                // Just for dev purposes
                .then(function(names) {console.log(names);});

                function getNames(groups) {
                    return groups.map(function(group) { return group.name; });
                }
            }

            getAllNames();
            // function getAllNames(groupId) {
            //     var deferred = $q.defer();

            // }

            var activeGroup = [];

            return {
                getAll: getAll,

                create: create
            };

        }
    ]);
