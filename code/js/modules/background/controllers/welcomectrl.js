define(['util/messagingClient', 'logging', 'staticConfig'],
  function(client, logging, sc) {

  var log = new logging(true, 'welcomectrl', client);
  return ['$scope', '$location', '$http', '$window', function($scope, $location, $http, $window) {
    log.debug('welcomectrl started');

    // some variable for check if angular works ok
    $scope.welcome_page = 'Welcome page';
    $scope.login = function () {
      $window.location.href = 'https://soundcloud.com/connect?client_id=01a6e90d3af7651267ce1c0f44ca5fa3&redirect_uri=chrome-extension://cgbpjmppgldahfnhlclbmoddmneieige/html/application.html#/options&response_type=token&display=popup&scope=non-expiring';
    }

    // because this has happened asynchronously we've missed
    // Angular's initial call to $apply after the controller has been loaded
    // hence we need to explicitly call it at the end of our Controller constructor
    $scope.$apply();
  }];
});