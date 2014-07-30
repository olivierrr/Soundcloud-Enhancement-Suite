angular.module('SESApp')
    .factory('modal', ['$modal', 'Groups', 'followingService', 'Soundcloud',

        function($modal, Groups, followingService, Soundcloud) {

            var groups = Groups.all();
            var data = [];

            function openModal(size) {
                followingService.getFollowingCount(2051971).then(function(following) {console.log(following);
                var modalInstance = $modal.open({
                    templateUrl: chrome.extension.getURL('/html/groups/partials/modal.html'),
                    controller: ModalInstanceCtrl,
                    size: size,
                    resolve: {
                        items: function() {
                            return following;
                        }
                    }
                });});
            }

            return {
                open: openModal
            };
        }
    ]);
