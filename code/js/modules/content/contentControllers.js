define(['angular', 'util/messaging', 'util/messagingClient', 'content/contentServices'],
  function(angular, messaging, client, services) {
    'use strict';

    return angular.module('seaApp.controllers', ['seaApp.services'])

    // content controller
    .controller('StreamController', ['$scope', '$location', '$q', 'streamService', 'Groups',
      function($scope, $location, $q, streamService, Groups) {
        require(['content/controllers/streamController'], function(StreamController) {
          angular.injector(['ng']).invoke(StreamController, this, {
            '$scope': $scope,
            '$location': $location,
            '$q': $q,
            'streamService': streamService,
            'Groups': Groups
          });
        });
      }
    ])
      .controller('GroupController', ['$scope', '$rootScope', '$location', 'Groups',
        function($scope, $rootScope, $location, Groups) {
          require(['content/controllers/groupController'], function(GroupController) {
            angular.injector(['ng']).invoke(GroupController, this, {
              '$scope': $scope,
              '$rootScope': $rootScope,
              '$location': $location,
              'Groups': Groups
            });
          });
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
