define(['angular', 'content/contentServices'],
  function (angular) {
  'use strict';


  return angular.module('contentApp.controllers', ['contentApp.services'])

    // content controller
    /*.controller('ContentController', ['$scope', '$location',
      function($scope, $location) {
        require(['content/controllers/contentctrl'], function(contentctrl) {
        angular.injector(['ng']).invoke(contentctrl, this,
          {'$scope': $scope, '$location': $location});
      });
    }]);*/

    .controller('StreamController', ['$scope', '$location', 'Soundcloud', 'Groups', function($scope, $location, Soundcloud, Groups) {

      Soundcloud.get('/users/515070/favorites', {q: 'sydney'},
          function(tracks) {
            //$scope.tracks = tracks;
            console.log(tracks);
        });

      /*chrome.storage.sync.get("groups", function(obj) {
        $scope.$apply(function() {
          $scope.groups = obj.groups;
        })
      });*/

    }]);

});