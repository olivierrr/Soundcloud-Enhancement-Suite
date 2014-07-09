define(['angular', 'util/messaging', 'util/messagingClient', 'content/contentServices'],
  function(angular, messaging, client, services) {
    'use strict';

    return angular.module('seaApp.controllers', ['seaApp.services'])

    // content controller
    .controller('StreamController', ['$scope', '$location', '$q', '$timeout', 'streamService', 'Groups',
      function($scope, $location, $q, $timeout, streamService, Groups) {
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
      .controller('GroupController', ['$scope', '$rootScope', '$location', 'Groups', 'filterFilter',
        function($scope, $rootScope, $location, Groups, filterFilter) {
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
      .controller('FollowController', ['$scope', '$location', '$q', 'Soundcloud', 'Groups',
        function($scope, $location, $q, Soundcloud, Groups) {
          require(['content/controllers/followController'], function(FollowController) {
            angular.injector(['ng']).invoke(FollowController, this, {
              '$scope': $scope,
              '$location': $location,
              '$q': $q,
              'Soundcloud': Soundcloud,
              'Groups': Groups
            });
          });
        }
      ])
      .controller('ProfileController', ['$scope', '$location',
        function($scope, $location) {

        }
      ]);
  });
