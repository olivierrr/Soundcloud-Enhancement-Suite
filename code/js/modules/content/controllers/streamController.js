/**
 * Controller for the stream view
 */

define(['util/messagingClient', 'logging'],
  function(client, logging) {
    var log = new logging(true, 'StreamController', client);
    return ['$scope', '$location', 'streamService', 'Groups', function($scope, $location, streamService, Groups) {
      log.debug('Stream controller started');

      // listen for group change and get the new stream
      $scope.$on('activeGroupChanged', function buildActiveStream(event, group) {
        $scope.group = group;
        $scope.stream = streamService.buildStream(group);
      });

      $scope.$apply();
    }];
  });
