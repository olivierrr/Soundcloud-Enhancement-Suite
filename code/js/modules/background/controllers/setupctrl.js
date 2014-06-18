define(['util/messagingClient', 'logging'],
  function(client, logging) {

  var log = new logging(true, 'optionsctrl', client);
  return ['$scope', '$location', '$http', function($scope, $location, $http) {
    log.debug('setupctrl started');

    // Get all /me/favorites
    // Strip all but username, trackname, ID
    // Sort by username
    // Sort by track
    // Save both to storage

    // Get all /me/followings
    // Record # of each first letter
    // Create an object containing :
    // {
    //  size: number,
    //  letters: {
    //    index: number,
    //    count: number
    //  },
    //  followings: {
    //    index: number,
    //    username: string,
    //    ID: number
    //  }
    // }


    // because this has happened asynchronously we've missed
    // Angular's initial call to $apply after the controller has been loaded
    // hence we need to explicitly call it at the end of our Controller constructor
    $scope.$apply();
  }];
});