define(['angular', 'staticConfig'], function(angular, sc) {
  'use strict';

  angular.module('seaApp.services', [])

  /* Group Factory Service */
  .factory('Groups', function() {

    var groups = [{
      name: 'None',
      artists: []
    }, {
      name: 'Trap Artists',
      artists: [2051971, 16730, 515070]
    }, {
      name: 'Something',
      artists: [1520490, 92661, 188783]
    }];

    var activeGroup = [];

    return {
      all: function getAll() {
        return groups;
      }
    };

  })

  /* Soundcloud Factory Service */
  .factory('Soundcloud', function($http, $rootScope, $timeout, $q) {

    var request = function(method, path, params) {
      _.extend(params, {
        client_id: sc.soundcloud.client_id,
        oauth_token: sc.soundcloud.access_token
      });

      var deferred = $q.defer();

      $http({
        method: method,
        url: sc.soundcloud.api.host + path,
        params: params
      })
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(reason) {
          deferred.reject(reason);
        });

      return deferred.promise;
    };

    return {
      get: function(path, params) {
        return request('GET', path, params);
      },
      put: function(path, params) {
        return request('PUT', path, params);
      },

      post: function(path, params) {
        return request('POST', path, params);
      },

      delete: function(path, params) {
        return request('DELETE', path, params);
      }
    };
  })

  /* Soundcloud Factory Service */
  .factory('streamService', ['$http', '$rootScope', '$timeout', '$q', 'Soundcloud',
    function($http, $rootScope, $timeout, $q, Soundcloud) {

      function getTrackData(id) {
        return Soundcloud.get('/users/' + id + '/tracks', {
          limit: 5
        });
      }

      function getPlaylists(id) {
        return Soundcloud.get('/users/' + id + '/playlists', {
          limit: 5
        });
      }

      function getArtistData(id) {
        return $q.all({tracks: getTrackData(id),
          playlists: getPlaylists(id)});
      }


      function _buildStream(artistIds) {
        var _stream = [];


        return $q.all(artistIds.map(getArtistData)).then(function(infos) {
          return infos.reduce(function(stream, info) {
            return stream.concat(info.tracks, info.playlists);
          }, _stream);
        });
      }

      return {
        buildStream: _buildStream
      };
    }
  ]);
});
