/**
 * Controller for the stream view
 */
angular.module('SESApp')
    .controller('GroupController', ['$scope', '$rootScope', '$location', '$http', 'Groups', '$log', 'modal',
        function($scope, $rootScope, $location, $http, Groups, $log, modal) {

            (function getGroups() {
                $scope.groups = Groups.all();
            }());

            $scope.activeGroup = [];

            $scope.setActiveGroup = function setActiveGroup(group) {
                if ($scope.activeGroup != group) {
                    $scope.activeGroup = group;

                    // broadcast group change to notify listener in StreamController
                    $rootScope.$broadcast('activeGroupChanged', group);
                }
            };

  $scope.open = function(size) {
    modal.open(size);
  };
  /*
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };*/
        }
    ]);
