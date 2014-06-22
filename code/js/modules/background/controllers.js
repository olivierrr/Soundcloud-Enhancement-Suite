define(['angular'],
  function (angular) {
  'use strict';

  return angular.module('bgApp.controllers', [])

    // welcome controller
    .controller('AuthController', ['$scope', '$location',
      function($scope, $location) {
        require(['background/controllers/authController'], function(AuthController) {
        angular.injector(['ng']).invoke(AuthController, this,
          {'$scope': $scope, '$location': $location});
      });
    }])
    // options controller
    .controller('OptionsController', ['$scope', '$location',
      function($scope, $location) {
        require(['background/controllers/optionsctrl'], function(optionsctrl) {
        angular.injector(['ng']).invoke(optionsctrl, this,
          {'$scope': $scope, '$location': $location});
      });
    }]);
});