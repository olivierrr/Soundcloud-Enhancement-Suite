angular.module('SESApp')
    .directive('streamItem', function($compile) {

        var linker = function(scope, element, attrs) {
            console.log(scope.item.kind);
            chrome.runtime.sendMessage({
                base: 'streams',
                template: scope.item.kind
            }, function(response) {
                console.log(response);
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
