/**
 * Controller for the stream view
 */

define(['util/messagingClient', 'logging'],
  function(client, logging) {
    var log = new logging(true, 'GroupController', client);
    return ['$scope', '$rootScope', '$location', '$http', 'Groups', function($scope, $rootScope, $location, $http, Groups) {
      log.debug('Group controller started');

      function getGroups() {
        $scope.groups = Groups.all();
      }

      getGroups();
      
      $scope.activeGroup = [];

      $scope.setActiveGroup = function setActiveGroup(group) {
        if ($scope.activeGroup != group) {
          $scope.activeGroup = group;
          $rootScope.$broadcast('activeGroupChanged', group);
        }
      };

      $scope.$apply();
    }];
  });
