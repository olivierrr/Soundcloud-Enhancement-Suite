    angular.module('SESApp')

    /* Group Factory Service */
    .factory('Groups', function() {
        var groups = [{
            name: 'None',
            artists: []
        }, {
            name: 'Myself',
            artists: [2051971]
        }, {
            name: 'House',
            artists: [2051971, 16730, 515070]
        }, {
            name: 'Aeroplane',
            artists: [1520490, 92661, 188783]
        }];

        chrome.storage.sync.set({'groups': groups}, function(){
        chrome.storage.sync.get("groups", function(obj) {
            console.log(obj);
        });});

        var activeGroup = [];

        return {
            all: function getAll() {
                return groups;
            }
        };

    });