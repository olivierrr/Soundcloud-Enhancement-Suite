    angular.module('SESApp')

    /* Group Factory Service */
    .factory('Groups', ['$q', 'IDBStore',
        function($q, IDBStore) {

            function openStore() {
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
                var deferred = $q.defer();

                openStore().then(addToStore, err);

                function addToStore(store) {
                    store.put(group, success, err);
                }

                function success(tester) {
                    console.log(tester);
                    deferred.resolve();
                }

                function err(reason) {
                    deferred.reject(reason);
                }

                return deferred.promise;
            }

            /**
             * Get all groups from the store.
             * @return {[type]} [description]
             */
            function getAll() {
                var deferred = $q.defer();

                openStore().then(getGroupData);

                function getGroupData(store) {
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
             * Get names of all user's groups.
             * @return {[type]} [description]
             */
            function getAllNames() {
                getAll().then(getNames, error);

                function getNames(groups) {
                    return groups.map(function(group) { return group.name; });
                }

                function error(reason) {

                }
            }

            var activeGroup = [];

            return {
                getAll: getAll,

                create: create
            };

        }
    ]);
