/**
 * Follow View Controller
 */

angular.module('SESApp')
    .controller('FollowingController', ['$scope', '$location', '$q', '$timeout', 'Soundcloud',
            function($scope, $location, $q, $timeout, Soundcloud) {

                $scope.getList = function(letter) {
                    $scope.follow = list[letters];
                };

                $scope.setCurrentLetter = function(letter) {
                    $scope.currentLetterGroup = $scope.following[letter];
                    $scope.currentLetter = letter;
                };
            }
        ]);