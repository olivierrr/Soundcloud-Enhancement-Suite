angular.module('SESApp')
    .factory('modalService', ['$modal',
        function($modal) {

            function openModal(size, template, controller, data) {
                var modalInstance = $modal.open({
                    templateUrl: chrome.extension.getURL('/app/streams/views/streamsModal.html'),
                    controller: controller,
                    size: size,
                    resolve: {
                        modalData: function() {
                            return data;
                        }
                    }
                });
            }

            return {
                open: openModal
            };
        }
    ]);
