/**
 * Controller for Groups Modal
 */
angular.module('SESApp')
    .controller('StreamsModalController', ['$scope', '$log', '$location', '$anchorScroll', '$modal', 'modalService', 'modalData', 'streamsManagerService', 'Soundcloud', 'friendsService',
        function($scope, $log, $location, $anchorScroll, $modal, modalService, modalData, streamsManagerService, Soundcloud, friendsService) {

            (function getStreams() {
                streamsManagerService.getAll().then(function(streams) {
                    $scope.streams = streams;
                });
            })();
$scope.dropped = function(dragEl, dropEl) {
      // this is your application logic, do whatever makes sense
      var drag = angular.element(dragEl);
      var drop = angular.element(dropEl);

      console.log("The element " + drag.attr('id') + " has been dropped on " + drop.attr("id") + "!");
    };
            (function getFriendsList() {
                Soundcloud.me()
                    .then(getList)
                    .then(done);

                function getList(user) {
                    return friendsService.getList(user);
                }

                function done(list) {
                    console.log(list);
                    $scope.friends = list;
                }
            })();
            $scope.isBlank = function(name) {
                console.log(name);
            };
            $scope.setCurrentLetter = function(letter) {
                $scope.currentLetterGroup = $scope.friends[letter];
                $scope.currentLetter = letter;
                $location.hash(letter);
                $anchorScroll();
            };
            $scope.activateTab = function(tab) {
                var oldTab = '.' + $scope.activeTab + 'Tab';
                var newTab = '.' + tab + 'Tab';
                if (oldTab != newTab) {
                    angular.element(oldTab).removeClass('active');
                }

                angular.element(newTab).addClass('active');

                $scope.activeTab = tab;
            };

            $scope.activateTab(modalData.activeTab);

            $scope.selectUser = function (user) {
                user.selected = true;
                console.log(user);

            };

            $scope.createNewStream = function(stream) {
                var artists = [];
                console.log($scope.friends);
                angular.forEach($scope.friends, function(letters) {
                    letters.map(function(user) {
                        if (user.selected === true) {
                            console.log("Selected: " + user.username + "(" + user.id + ")");
                            artists.push(user.id);
                        }
                    });
                });
                var group = {name: stream.name, artists: artists};
                streamsManagerService.create(group);
            };

            $scope.cancel = function() {
                $scope.$close({
                    result: 'cancelled'
                });
            };
        }
    ]);
