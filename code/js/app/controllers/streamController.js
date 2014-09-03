/**
 * Controller for the stream view
 */

angular.module('SESApp')
    .controller('StreamController', ['$scope', '$location', '$q', '$modal', '$log', 'streamService', 'Groups',
        function($scope, $location, $q, $modal, $log, streamService, Groups) {

            // listen for group change and get the new stream
            $scope.$on('activeGroupChanged', function buildActiveStream(event, group) {
                streamService.buildStream(group.artists).then(function done(stream) {
                    $scope.stream = stream;
                });
            });
        }
    ]);