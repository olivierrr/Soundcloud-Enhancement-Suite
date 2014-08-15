/**
 * Follow View Controller
 */

angular.module('SESApp')
    .controller('FollowingController', ['$scope', '$location', '$q', '$timeout', 'followingService', 'Soundcloud',
        function($scope, $location, $q, $timeout, followingService, Soundcloud) {

            (function getList() {
                var userId;

                // remove /following from the url to get user's url
                var userUrl = $location.absUrl().slice(0, -10);

                // resolve the url to get the user object
                Soundcloud.resolve({
                    url: userUrl
                })
                    .then(function(user) {
                        if (user) {
                            // get user's list of followed users
                            followingService.getList(user, function addToScope(list) {
                                console.log(list);
                                $scope.following = list;
                            });
                        } else {
                            console.error("Error: Unable to resolve user");
                        }
                    });
            })();

            /**
             * Get the list of followed users whose names begin with the given letter
             *
             * @param  {string} letter Currently selected letter
             */
            $scope.getList = function(letter) {
                $scope.follow = list[letter];
            };

            $scope.setCurrentLetter = function(letter) {
                $scope.currentLetterGroup = $scope.following[letter];
                $scope.currentLetter = letter;
            };
        }
    ]);
