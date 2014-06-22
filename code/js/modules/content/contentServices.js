define(['angular', 'lib/async', 'staticConfig'], function (angular, async, sc) {
  'use strict';

  angular.module('contentApp.services', [])

    /* Group Factory Service */
    .factory('Groups', function() {

      var groups = [{
        name: 'None',
        artists: []
      },
      {
        name: 'Trap Artists',
        artists: [2051971, 16730, 515070]
      },
      {
        name: 'Something',
        artists: [1520490, 92661, 188783]
      }];

      return {
        all: function() {
          return groups;
        },
      };

    })

    /* Soundcloud Factory Service */
    .factory('Soundcloud', function($http, $rootScope, $timeout) {

      var request = function(method, path, params, callback) {
        params.client_id = sc.soundcloud.client_id;
        params.oauth_token = sc.soundcloud.access_token;

        $http({
          method: method,
          url: sc.soundcloud.api.host + path,
          params: params
        })
        .success(callback);
      };

      return {
        buildStream: function(group, cb) {
          var artists = group.artists;
          var params = {
            limit: 5
          };
          async.each(artists, function(artist, callback) {
            request('GET', '/e1/users/' + artist + '/stream', params, cb);
            callback();
          }, function(err) {
            if (err) console.log(err);
          });
        },
        get: function(path, params, callback) {
          request('GET', path, params, callback);
        },

        put: function(path, params, callback) {
          request('PUT', path, params, callback);
        },

        post: function(path, params, callback) {
          request('POST', path, params, callback);
        },

        delete: function(path, params, callback) {
          request('DELETE', path, params, callback);
        }
      };
    });
});