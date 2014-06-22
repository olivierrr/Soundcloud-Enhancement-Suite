//
// Controller for stream
//

define(['util/messagingClient', 'logging'],
  function(client, logging, services) {
    var log = new logging(true, 'StreamController', client);
    return ['$scope', '$location', '$http', 'Soundcloud', 'Groups', function($scope, $location, $http, Soundcloud, Groups) {
      log.debug('Stream controller started')

      Soundcloud.get('/tracks/', {'limit': 5}, function(tracks) {
        $scope.tracks = tracks;
      })

      // because this has happened asynchronously we've missed
      // Angular's initial call to $apply after the controller has been loaded
      // hence we need to explicitly call it at the end of our Controller constructor
      $scope.$apply();
    }];
});