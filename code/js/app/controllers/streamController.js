/**
 * Controller for the stream view
 */

angular.module('SESApp')
    .controller('StreamController', ['$scope', '$location', '$q', 'streamService', 'Groups', function($scope, $location, $q, streamService, Groups) {

      // listen for group change and get the new stream
      $scope.$on('activeGroupChanged', function buildActiveStream(event, group) {
        streamService.buildStream(group.artists).then(function(stream) {
          console.log(stream);
          $scope.stream = stream;
        });
      });

      $scope.$apply();
    }]);
