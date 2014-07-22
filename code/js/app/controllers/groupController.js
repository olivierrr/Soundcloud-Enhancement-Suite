/**
 * Controller for the stream view
 */

angular.module('SESApp')
    .controller('GroupController', ['$scope', '$rootScope', '$location', '$http', 'Groups',
        function($scope, $rootScope, $location, $http, Groups) {

            (function getGroups() {
                $scope.groups = Groups.all();
            }());

            $scope.activeGroup = [];

            $scope.setActiveGroup = function setActiveGroup(group) {
                if ($scope.activeGroup != group) {
                    $scope.activeGroup = group;
                    $rootScope.$broadcast('activeGroupChanged', group);
                }
            };

        }
    ]);
