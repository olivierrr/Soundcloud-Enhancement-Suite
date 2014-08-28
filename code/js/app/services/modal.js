angular.module('SESApp')
    .factory('modal', ['$modal', 'Groups', 'followingService', 'Soundcloud',
        function($modal, Groups, followingService, Soundcloud) {
            var groups = ['Jimm'];
            var data = [];

            function openModal(size, modalController) {
                var modalInstance = $modal.open({
                    templateUrl: chrome.extension.getURL('/html/groups/partials/modal.html'),
                    controller: modalController,
                    size: size,
                    resolve: {
                        items: function() {
                            return '';
                        }
                    }
                });
            }

            return {
                open: openModal
            };
        }
    ]);
