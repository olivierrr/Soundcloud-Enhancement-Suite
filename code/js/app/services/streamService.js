/* Soundcloud Factory Service */
angular.module('SESApp')
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

                // resolved once the entire stream is built
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
    ]);
