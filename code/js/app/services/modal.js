angular.module('SESApp')
    .factory('modal', ['$modal', 'Groups', 'followingService', 'Soundcloud',
        function($modal, Groups, followingService, Soundcloud) {

            function openModal(size, template, controller, data) {
                var modalInstance = $modal.open({
                    templateUrl: chrome.extension.getURL('/html/' + template + '/partials/modal.html'),
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
