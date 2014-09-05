/**
 * Controller for the stream view
 */
angular.module('SESApp')
    .controller('GroupController', ['$scope', '$rootScope', '$location', '$http', 'Groups', '$log', 'modal',
        function($scope, $rootScope, $location, $http, Groups, $log, modal) {

            /**
             * @desc requests
             * @return {[type]} [description]
             */
            (function getGroups() {
                Groups.getAll().then(function(groups) {
                    $scope.groups = groups;
                });
            }());

            $scope.activeGroup = [];

            /**
             *
             * @param {[type]} group [description]
             */
            $scope.setActiveGroup = function setActiveGroup(group) {
                if ($scope.activeGroup != group) {
                    var defaultStream = angular.element('.stream__list');

                    if (!defaultStream.hasClass('hide')) {
                        angular.element('.stream__list').addClass('hide');
                    }
                    $scope.activeGroup = group;

                    // broadcast group change to notify listener in StreamController
                    $rootScope.$broadcast('activeGroupChanged', group);
                }
            };

            $scope.open = function(size) {
                modal.open(size, 'groups', 'GroupsModalController', {activeTab: 'create'});
            };
        }
    ]);
