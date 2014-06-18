//
// Controller for content script
//

define(['util/messagingClient', 'logging'],
  function(client, logging, services) {
    var log = new logging(true, 'contentctrl', client);
    return ['$scope', '$location', '$http', function($scope, $location, $http) {
      log.debug('Content ctrl started')

      // define some variable for check if angular works ok
      $scope.content_script = 'Content Script';

      Soundcloud.get('/tracks/', {'limit': 5}, function(tracks) {
        $scope.tracks = tracks;
      })

      // because this has happened asynchronously we've missed
      // Angular's initial call to $apply after the controller has been loaded
      // hence we need to explicitly call it at the end of our Controller constructor
      $scope.$apply();
    }];
});