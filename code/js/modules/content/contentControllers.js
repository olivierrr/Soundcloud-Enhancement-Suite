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
      var full_tracks = [];
      var total = 3417;
      var _offset = 0;
      var limit_size = 50;
      var i;
      /*var success = function(tracks) {
            full_tracks.push(tracks);
            console.log("TRACKS: ");
            console.log(tracks);
            console.log("Full: ");
            console.log(full_tracks);
        };*/


        /*Soundcloud.get('/me/followings', {}, function(tracks) {
          console.log(tracks);
        });*/

        /*var fav = function() { Soundcloud.get('/users/515070/favorites', {offset: _offset}, function(tracks) {
            console.log(_offset);
            full_tracks.push(tracks);
            _offset += 50;

            if (_offset < total) {
              console.log("recursive");
              fav();
            }
            else {

            }
          });
        };

        fav();*/

      /*chrome.storage.sync.get("groups", function(obj) {
        $scope.$apply(function() {
          $scope.groups = obj.groups;
        })
      });*/

    }]);

});