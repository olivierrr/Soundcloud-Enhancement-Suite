/**
 * Controller for the stream view
 */

angular.module('SESApp')
    .controller('StreamsMainController', ['$scope', '$location', '$q', '$modal', '$log', 'streamsBuilderService', 'streamsManagerService', function($scope, $location, $q, $modal, $log, streamsBuilderService, streamsManagerService) {

        console.log("loaded");

        $scope.testing = "World";


      // listen for group change and get the new stream
      $scope.$on('activeStreamChanged', function buildActiveStream(event, newStream) {

        streamsBuilderService.buildStream(newStream.artists).then(function done(stream) {
            console.log("Stream");
          console.log(stream);
          $scope.stream = stream;
          console.log("$SCOPE.STREAM");
          console.log($scope.stream);
        });
      });
    }]);