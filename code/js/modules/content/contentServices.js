define(['angular'], function (angular) {
  'use strict';

  angular.module('contentApp.services', [])
    .factory('Groups', function() {

      chrome.storage.sync.set({"groups": "hello"});

      return {
        getGroups: function() {
          chrome.storage.sync.get("groups", function (obj) {
            console.log(obj);
          });
        }
      };
    })
    .factory('Soundcloud', function($http, $q, $rootScope, $timeout) {

    var host_api = 'https://api.soundcloud.com',
        client_id = '01a6e90d3af7651267ce1c0f44ca5fa3',
        client_secret = '603185416c50ae34169cdcd91bd5b2e1';

    /*function cleanTrackUrls (tracks, callback) {
      var url = "http://www.soundcloud.com";
      var tags;

      async.each(tracks, function(track) {
        track.permalink_url.replace("http://www.soundcloud.com", "");
        track.user.permalink_url.replace("http://www.soundcloud.com", "");

        tags = track.tag_list;
        track.tag_list = tags.substring(0, tags.indexOf(' '));
      }, callback);
    };*/

    return {

      get: function(path, _params, callback) {
        _params.client_id = client_id;
        _params.oauth_token = '1-79854-2051971-59c20a26fb4c9473';

        $http({
          method: 'GET',
          url: host_api + path,
          params: _params
        })
        .success(callback);
      }
    };

  });

});