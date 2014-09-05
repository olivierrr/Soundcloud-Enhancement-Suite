/**
 * Controller for the stream view
 */
angular.module('SESApp')
    .controller('StreamsSidebarController', ['$scope', '$rootScope', '$location', '$http', 'streamsManagerService', '$log', 'modalService',
        function($scope, $rootScope, $location, $http, streamsManagerService, $log, modalService) {

            /**
             * @desc requests
             * @return {[type]} [description]
             */
            (function getStreams() {
                streamsManagerService.getAll().then(function(streams) {
                    $scope.streams = streams;
                });
            }());

            $scope.activeStream = [];

            /**
             *
             * @param {[type]} stream [description]
             */
            $scope.setActiveStream = function setActiveStream(stream) {
                if ($scope.activeStream != stream) {
                    var defaultStream = angular.element('.stream__list');

                    if (!defaultStream.hasClass('hide')) {
                        angular.element('.stream__list').addClass('hide');
                    }
                    $scope.activeStream = stream;

                    // broadcast stream change to notify listener in StreamController
                    $rootScope.$broadcast('activeStreamChanged', stream);
                }
            };

            $scope.open = function(size) {
                modalService.open(size, 'streams', 'StreamsModalController', {activeTab: 'create'});
            };
        }
    ]);
