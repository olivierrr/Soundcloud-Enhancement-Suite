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

        post: function(path, params, callback) {
          return request('POST', path, params);
        },

        delete: function(path, params, callback) {
          return request('DELETE', path, params);
        }
      };
    })

    /* Soundcloud Factory Service */
    .factory('streamService', ['$http', '$rootScope', '$timeout', '$q', 'Soundcloud',
        function($http, $rootScope, $timeout, $q, Soundcloud) {

          var buildStream = function buildStream(group) {
            var params = {
              limit: 5
            };

            _.each(group.artists, getStreamItems);

            function getStreamItems(artist) {
              Soundcloud.get('/e1/users/' + artist + '/stream', params)
                .then(processItems(items));
            }

            function (items) {
              _.each(items, formatItem);
              return items;

              function format(item) {
                item.stream_date = item.created_at;
                item.reposted = (item.type.slice(-6) === 'repost');

                if (item.playlist) {
                  delete item.playlist.created_with;
                  delete item.playlist.description;
                  delete item.playlist.kind;
                  delete item.playlist.release;
                  delete item.playlist.release_day;
                  delete item.playlist.release_month;
                  delete item.playlist.release_year;
                  delete item.playlist.type;
                  _.assign(item, item.playlist);
                } else {
                  delete item.track.description;
                  delete item.track.kind;
                  _.assign(item, item.track);
                }

                delete item.playlist;
                delete item.track;

                return item;
              }
              _.each(group.artists, getStreamItems);

            };

            return {
              buildStream: function(group) {
                return buildStream(group);
              },

              getStream: function getStream() {
                return stream;
              }
            };
          }
          ]);
    });
