    angular.module('SESApp')
        .factory('followingService', ['$http', '$timeout', '$q', 'Soundcloud',
            function($http, $timeout, $q, Soundcloud) {
                // holds our alphabetized list
                var list = {};

                /**
                 * Takes a user and places them into the list by the first letter
                 * of their username.
                 *
                 * @param {object} user The user to be alphabetized
                 */
                var addToIndex = function(user) {
                    var letter = user.username.charAt(0).toUpperCase();

                    // name starts with a letter
                    if (letter.match(/[A-Z]/)) {
                        // if that letter index doesn't exist, create it
                        if (list[letter] === undefined) {
                            list[letter] = [];
                        }
                        list[letter].push(user);
                    }
                    // name starts with a number
                    else if (letter.match(/\d/)) {
                        if (list['#'] === undefined) {
                            list['#'] = [];
                        }
                        list['#'].push(user);
                    }
                    // all other characters go in the # list for right now
                    else {
                        if (list['#'] === undefined) {
                            list['#'] = [];
                        }
                        list['#'].push(user);
                    }
                };

                /**
                 * Request users in the follow list.
                 */
                function getFollowings(offset, userId) {
                    return Soundcloud.get('/users/' + userId + '/followings', {
                        limit: 200,
                        offset: offset
                    });
                }

                /**
                 * Builds the list using promises.
                 *
                 * Soundcloud's API has a limit of 200 items per request,
                 * so we need to call getFollowings multiple times.
                 */
                function buildList(userId, count) {
                    var promises = [],
                        i = 0;

                    function mapUsers (users) {
                        users.map(addToIndex);
                    }

                    while (i <= count) {
                        promises.push(getFollowings(i, userId).then(mapUsers)
                            );
                        i += 200;
                    }
                    return $q.all(promises);
                }

                /**
                 * This is a really janky implementation.  It calls buildList,
                 * which creates a bunch of promises that are resolved when getFollowings
                 * returns user data and maps the users into our list object.  Ideally,
                 * the users in our .then should be the built list that we can return
                 * and not use a callback.
                 */
                function getList(user, callback) {
                    var deferred = $q.defer();
                    // clear the list variable
                    list = {};
                    buildList(user.id, user.followings_count)
                        .then(function(users) {
                            deferred.resolve(list);
                        });

                    return deferred.promise;
                }

                return {
                    getList: getList
                };
            }
        ]);
