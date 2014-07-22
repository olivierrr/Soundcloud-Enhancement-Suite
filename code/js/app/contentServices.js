    angular.module('SESApp')

    /* Group Factory Service */
    .factory('Groups', function() {

        var groups = [{
            name: 'None',
            artists: []
        }, {
            name: 'One',
            artists: [2051971]
        }, {
            name: 'Trap Artist',
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

        function request(method, path, params) {
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
            resolve: function resolve(params) {
                return request('GET', '/resolve', params);
            }
        };
    })

    /* Soundcloud Factory Service */
    .factory('streamService', ['$http', '$rootScope', '$timeout', '$q', 'Soundcloud',
            function($http, $rootScope, $timeout, $q, Soundcloud) {

                /*
                 * Since we can't use the non-public stream endpoint, we have to call tracks and
                 * playlists individually to build the user's stream. Reposts are inaccessible with
                 * public API.
                 */

                function getTrackData(id) {
                    return Soundcloud.get('/users/' + id + '/tracks', {
                        limit: 1
                    });
                }

                function getPlaylists(id) {
                    return Soundcloud.get('/users/' + id + '/playlists', {
                        limit: 1
                    });
                }

                function getArtistData(id) {
                    // combines both requests into one promise
                    return $q.all({
                        tracks: getTrackData(id),
                        playlists: getPlaylists(id)
                    });
                }


                function _buildStream(artistIds) {
                    var _stream = [];

                    // Once the entire stream is built, this is resolved.
                    return $q.all(artistIds.map(getArtistData)).then(function(infos) {
                        console.log(infos);
                        return infos.reduce(function(stream, info) {
                            return stream.concat(info.tracks, info.playlists);
                        }, _stream);
                    });
                }

                return {
                    buildStream: _buildStream
                };
            }
        ])
        .factory('followingService', ['$http', '$timeout', '$q', 'Soundcloud',
            function($http, $timeout, $q, Soundcloud) {

                var count = 0;

                var list = {};


                var addToIndex = function(user) {
                    var letter = user.username.charAt(0).toUpperCase();
                    if (letter.match(/[A-Z]/)) {
                        if (list[letter] === undefined) {
                            list[letter] = [];
                        }
                        list[letter].push(user);
                    } else if (letter.match(/\d/)) {
                        if (list['#'] === undefined) {
                            list['#'] = [];
                        }
                        list['#'].push(user);
                    } else {
                        if (list['#'] === undefined) {
                            list['#'] = [];
                        }
                        list['#'].push(user);
                    }
                };

                /**
                 * Retrieve our user's follow list.
                 *
                 * Soundcloud's API limits results to 200 per request,
                 * so we build an array of enough function calls to get the whole list.
                 * @param  {[type]} l
                 * @return {[type]}
                 */


                function getFollowings(offset, userId) {
                    return Soundcloud.get('/users/' + userId + '/followings', {
                        limit: 200,
                        offset: offset
                    });
                }

                function getFollowingList(userId) {
                    var promises = [],
                        i = 0;
                    console.log(count);
                    while (i <= count) {
                        promises.push(getFollowings(i, userId));
                        i += 200;
                    }
                    return $q.all(promises);
                }
                function getFollowingCount(userId) {
                    Soundcloud.get('/users/' + userId, {})
                        .then(function(me) {
                            count = me.followings_count;
                            console.log(count);
                        })
                        .then(function() {
                            getFollowingList();
                        }).then(function(users) {
                            $scope.following = list;
                        });
                }

                return {
                    getFollowingList: _getFollowingList
                };
            }
        ]);
