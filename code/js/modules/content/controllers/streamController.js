/**
 * Controller for the stream view
 */

define(['util/messagingClient', 'logging'],
  function(client, logging) {
    var log = new logging(true, 'StreamController', client);
    return ['$scope', '$location', '$q', 'streamService', 'Groups', function($scope, $location, $q, streamService, Groups) {
      log.debug('Stream controller started');

      // listen for group change and get the new stream
      $scope.$on('activeGroupChanged', function buildActiveStream(event, group) {
        streamService.buildStream(group.artists).then(function(stream) {
          $scope.stream = stream;
        });
      });

      $scope.$apply();
    }];
  });
