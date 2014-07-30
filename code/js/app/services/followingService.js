    angular.module('SESApp')
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

                function _getFollowingList(userId) {
                    var promises = [],
                        i = 0;
                    console.log(count);
                    while (i <= count) {
                        promises.push(getFollowings(i, userId));
                        i += 200;
                    }
                    return $q.all(promises);
                }

                /**
                 * Main entry point. Needs to be able to accept user ids,
                 * me?, /following endpoint?
                 * @param  {[type]} userId [description]
                 * @return {[type]}        [description]
                 */
                function getFollowingCount(userId) {
                    Soundcloud.get('/users/' + userId, {})
                        .then(function(me) {
                            count = me.followings_count;
                            console.log(count);
                        })
                        .then(function() {
                            console.log('here');
                            _getFollowingList();
                        }).then(function(users) {
                            console.log(users);
                        });
                }

                return {
                    getFollowingList: _getFollowingList,
                    getFollowingCount: getFollowingCount
                };
            }
        ]);
