angular.module('SESApp')
    .directive('streamItem', function($compile) {

        var linker = function(scope, element, attrs) {

            chrome.runtime.sendMessage({
                template: 'stream/partials/' + scope.item.kind
            }, function(response) {
                element.html(response);

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
