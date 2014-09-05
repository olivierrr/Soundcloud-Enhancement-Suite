/**
 * Controller for Groups Modal
 */
angular.module('SESApp')
    .controller('StreamsModalController', ['$scope', '$log', '$modal', 'modalService', 'modalData', 'streamsManagerService', 'Soundcloud', 'friendsService',
        function($scope, $log, $modal, modalService, modalData, streamsManagerService, Soundcloud, friendsService) {

            (function getStreams() {
                streamsManagerService.getAll().then(function(streams) {
                    $scope.streams = streams;
                });
            })();
            (function getFriendsList() {
                Soundcloud.me()
                    .then(getList)
                    .then(done);

                function getList(user) {
                    return friendsService.getList(user);
                }

                function done(list) {
                    $scope.friends = list;
                }
            })();

            $scope.setCurrentLetter = function(letter) {
                $scope.currentLetterGroup = $scope.friends[letter];
                $scope.currentLetter = letter;
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

            $scope.createNewStream = function(stream) {
                console.log("Creating new stream");
                var group = {name: stream.name, artists: [123,456,789]};
                streamsManagerService.create(group);
            };

            $scope.cancel = function() {
                $scope.$close({
                    result: 'cancelled'
                });
            };
        }
    ]);
