/**
 * Follow View Controller
 */

angular.module('SESApp')
    .controller('FriendsController', ['$scope', '$location', 'friendsService', 'Soundcloud',
        function($scope, $location, friendsService, Soundcloud) {

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
                            // request user's list of friends (followed users)
                            friendsService.getList(user, function addToScope(list) {
                                console.log(list);
                                $scope.friends = list;
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
                $scope.friends = list[letter];
            };

            $scope.setCurrentLetter = function(letter) {
                $scope.currentLetterGroup = $scope.friends[letter];
                $scope.currentLetter = letter;
            };
        }
    ]);
