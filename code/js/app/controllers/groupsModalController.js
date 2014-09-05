/**
 * Controller for Groups Modal
 */
angular.module('SESApp')
    .controller('GroupsModalController', ['$scope', '$log', '$modal', 'modal', 'modalData', 'Groups', 'Soundcloud', 'followingService',
        function($scope, $log, $modal, modal, modalData, Groups, Soundcloud, followingService) {

            (function getGroups() {
                Groups.getAll().then(function(groups) {
                    console.log(groups);
                    $scope.groups = groups;
                });
            })();
            $scope.following = {a: 'fuck', b: 'you'};
            (function getFriendsList() {
                Soundcloud.me()
                    .then(getList)
                    .then(done);

                function getList(user) {
                    return followingService.getList(user);
                }

                function done(list) {
                    $scope.following = list;
                }
            })();

            $scope.setCurrentLetter = function(letter) {
                $scope.currentLetterGroup = $scope.following[letter];
                $scope.currentLetter = letter;
            };
            $scope.activateTab = function(tab) {
                console.log("test");
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
                console.log("okay");
                console.log(stream);
                var group = {name: stream.name, artists: [123,456,789]};
                Groups.create(group);
            };

            $scope.cancel = function() {
                $scope.$close({
                    result: 'cancelled'
                });
            };
        }
    ]);
