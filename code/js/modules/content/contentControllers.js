define(['angular', 'util/messaging', 'util/messagingClient', 'content/contentServices'],
  function(angular, messaging, client, services) {
    'use strict';

    return angular.module('contentApp.controllers', ['contentApp.services'])

    // content controller
    .controller('StreamController', ['$scope', '$rootScope', '$location', 'Soundcloud', 'Groups',
      function($scope, $rootScope, $location, Soundcloud, Groups) {
        /*require(['content/controllers/streamController'], function(StreamController) {
          angular.injector(['ng']).invoke(StreamController, this,
            {'$scope': $scope, '$location': $location});
        });*/
        $scope.tracks = [];

        var getStream = function(group) {
          Soundcloud.buildStream(group, function(tracks) {
            /* To-do: Only bind needed track properties to $scope */
            $scope.tracks = $scope.tracks.concat(tracks);
          });
        };

        /* Watch Groups.currentGroup() for changes? */
        $scope.$on('groupChanged', function(event, group) {
          $scope.tracks = [];
          getStream(group);
        });
      }
    ])
      .controller('GroupController', ['$scope', '$rootScope', '$location', 'Soundcloud', 'Groups',
        function($scope, $rootScope, $location, Soundcloud, Groups) {
          $scope.groups = Groups.all();
          $scope.current_group = [];

          $scope.setGroup = function(group) {
            $scope.current_group = group;
            $rootScope.$broadcast('groupChanged', group);
          };
        }
      ])
      .controller('FavoritesController', ['$scope', '$location',
        function($scope, $location) {

        }
      ])
      .controller('FollowingController', ['$scope', '$location',
        function($scope, $location) {

        }
      ])
      .controller('ProfileController', ['$scope', '$location',
        function($scope, $location) {

        }
      ]);
  });
