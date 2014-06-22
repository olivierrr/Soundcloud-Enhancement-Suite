define(['util/messagingClient', 'util/url', 'logging', 'staticConfig'],
    function(client, url, logging, sc) {

        var log = new logging(true, 'AuthController', client);
        return ['$scope', '$location', '$http', '$window', function($scope, $location, $http, $window) {
            log.debug('Auth controller started');

            var full_url;

            var params = sc.soundcloud.auth.params;
            params.client_id = sc.soundcloud.client_id;

            // build the url with query parameters
            url.build(sc.soundcloud.auth.host, params, function(result) {
                full_url = result;
            });
            var saveAccessToken = function(redirect_url) {
                parseQuery(redirect_url, function(params) {
                    var token = params[0].split('=')[1];
                    console.log(token);
                    chrome.storage.sync.set(sc.soundcloud.access_token, token);
                });
            };
            var parseQuery = function (url, callback) {
              var queries = url.split('?')[1].split('&');
              callback(queries);
            };           
            var connectToSoundcloud = function(url) {
              //$window.location.href
              initializeCache();
              /*console.log(url);
                chrome.identity.launchWebAuthFlow({
                        'url': url,
                        'interactive': true
                    },
                    function(redirect_url) {
                      parseQuery(redirect_url, function(params) {
                        var token = params[0].split('=')[1];
                        chrome.storage.sync.set(sc.soundcloud.access_token, token);
                      });
                      initializeCache();
                    }
                );*/
            };
            var initializeCache = function() {
                client.sendBroadcast({
                    cmd: 'CacheSoundcloudData',
                    args: [{
                        path: '/e1//stream',
                        params: {
                            client_id: sc.soundcloud.client_id,
                            oauth_token: sc.soundcloud.access_token,
                            limit: 200,
                            offset: 0
                        },
                        store: 'following',
                        initialize: true
                    }, {
                        path: '/e1/users/2051971/likes',
                        params: {
                            client_id: sc.soundcloud.client_id,
                            oauth_token: sc.soundcloud.access_token,
                            limit: 200,
                            offset: 0
                        },
                        store: 'favorites',
                        initialize: true
                    }]
                }, function(response) {

                });
            };

            $scope.connectToSoundcloud = function() {
                connectToSoundcloud(full_url);
            };

            // because this has happened asynchronously we've missed
            // Angular's initial call to $apply after the controller has been loaded
            // hence we need to explicitly call it at the end of our Controller constructor
            $scope.$apply();
        }];
    });
