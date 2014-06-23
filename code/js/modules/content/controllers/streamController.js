/**
 * Controller for the stream view
 */

define(['util/messagingClient', 'logging'],
  function(client, logging) {
    var log = new logging(true, 'StreamController', client);
    return ['$scope', '$location', 'streamService', 'Groups', function($scope, $location, streamService, Groups) {
      log.debug('Stream controller started');


      var getStream = function getStream(stream) {
        $scope.stream = stream;
        console.log(stream);
        console.log($scope.stream);
      };

      // listen for group change and get the new stream
      $scope.$on('activeGroupChanged', function (event, group) {
        streamService.buildStream(group, getStream);
      });

      $scope.$apply();
    }];
  });
