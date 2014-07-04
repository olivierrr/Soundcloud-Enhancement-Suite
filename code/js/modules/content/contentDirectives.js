define(['angular', 'staticConfig', 'util/messaging', 'util/messagingClient', ], function(angular, sc, messaging, client) {
    'use strict';

    angular.module('seaApp.directives', [])
   .config(function($sceDelegateProvider) {
     $sceDelegateProvider.resourceUrlWhitelist([
       // Allow same origin resource loads.
       'self',
       // Allow loading from our assets domain.  Notice the difference between * and **.
       'https://*.sndcdn.com/**',
       'https://*.waveformjs.org/**']);
})
    .directive('streamItem', function($compile) {

            var linker = function(scope, element, attrs) {

                client.sendBroadcast({
                    cmd: 'LoadHtml',
                    args: {
                        template: 'stream/partials/' + scope.item.kind,
                        data: {}
                    }
                }, function done(response) {

                    element.html(response).show();

                    $compile(element.contents())(scope);
                });
            };


        return {
            restrict: 'EA',
            link: linker,
            scope: {
                item: '=streamItem'
            }
        };
    });
});

/* .directive('trackPlayer', function() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'test',
            scope: {
                content: '='
            }
        };
    })
    .directive('playlistPlayer', function() {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'test',
        scope: {
            content: '='
        }
    };
});
});
*/
