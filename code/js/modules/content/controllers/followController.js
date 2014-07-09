/**
 * Controller for the follow view
 */

define(['util/messagingClient', 'logging'],
    function(client, logging) {
        var log = new logging(true, 'FollowController', client);
        return ['$scope', '$location', '$q', '$timeout', 'Soundcloud', 'Groups', 'filterFilter', function($scope, $location, $q, $timeout, Soundcloud, Groups, filterFilter) {
            log.debug('Follow controller started');

            /*var count = Soundcloud.getFollowCount()
                    .then(function(result) {
                        return result;
                    });*/
            var count = 620;

            var list = {};


            var addToIndex = function(user) {
                var letter = user.username.charAt(0).toUpperCase();
                if (letter.match(/ABCDEFGHIJKLMNOPQRSTUVWXYZ/)) {
                    if (list[letter] === undefined) {
                        list[letter] = [];
                    }
                    list[letter].push(user);
                }
                else if (letter.match(/1234567890/)) {
                    if (list['#'] === undefined) {
                        list['#'] = [];
                    }
                    list['#'].push(user);
                }
                else {
                    console.log('hello');
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

            function getFollows(offset) {
                return Soundcloud.get('/me/followings', {
                    limit: 200,
                    offset: offset
                });
            };

            function getFollowList() {
                var promises = [],
                    i = 0;
                while (i <= count) {
                    promises.push(getFollows(i).then(function(users) { return users.map(addToIndex); }));
                    i += 200;
                };
                return $q.all(promises);
            };


            getFollowList().then(function(users) {
                $scope.following = list;
            });

            $scope.getList = function(letter) {
                $scope.follow = list[letters];
            };

            $scope.$apply();
        }];
    });
