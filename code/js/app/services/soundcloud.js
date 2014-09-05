/* Soundcloud Factory Service */
angular.module('SESApp')
.factory('Soundcloud', function($http, $rootScope, $timeout, $q) {

    function request(method, path, params) {
        angular.extend(params, {
            client_id: '01a6e90d3af7651267ce1c0f44ca5fa3',
            oauth_token: '1-79854-2051971-6c01c0daaba6dcfe'
        });

        var deferred = $q.defer();

        $http({
            method: method,
            url: 'https://api.soundcloud.com' + path,
            params: params
        })
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(reason) {
                deferred.reject(reason);
            });

        return deferred.promise;
    }

    return {
        get: function get(path, params) {
            return request('GET', path, params);
        },
        put: function put(path, params) {
            return request('PUT', path, params);
        },

        post: function post(path, params) {
            return request('POST', path, params);
        },

        delete: function del(path, params) {
            return request('DELETE', path, params);
        },
        me: function me() {
            return request('GET', '/me', {});
        },
        resolve: function resolve(params) {
            return request('GET', '/resolve', params);
        }
    };
});
