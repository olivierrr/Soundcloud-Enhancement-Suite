angular.module('SESApp')
    .directive('friendsList', function($compile) {

        var linker = function(scope, element, attrs) {

            chrome.runtime.sendMessage({
                base: 'streams',
                template: 'friends'
            }, function(response) {
                element.html(response);

                $compile(element.contents())(scope);
            });
        };


        return {
            link: linker,

            restrict: 'EA',
            scope: true,
            controllerAs: 'StreamsModalController'
        };
    });
