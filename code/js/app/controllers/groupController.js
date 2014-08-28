/**
 * Controller for the stream view
 */
angular.module('SESApp')
    .controller('GroupController', ['$scope', '$rootScope', '$location', '$http', 'Groups', '$log', 'modal',
        function($scope, $rootScope, $location, $http, Groups, $log, modal) {

            (function getGroups() {
                Groups.getAll().then(function(data) {
                  $scope.groups = data;
                });
            }());

            $scope.activeGroup = [];

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
    modal.open(size);
  };
        }
    ]);
