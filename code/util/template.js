var template = function() {
    // template html cache
    var _cache = {};

    var templates = {
        friends: {
            main: 'app/friends/views/friends.html'
        },

        streams: {
            main: 'app/streams/views/streamsMain',
            modal: 'app/streams/views/streamsModal',
            sidebar: 'app/streams/views/streamsSidebar'
        },

        playlist: 'app/streams/views/partials/playlist',
        track: 'app/streams/views/partials/track',
    };

    return {
        // template loading (synchronous)
        load: function(base, name) {
            var target = templates[base][name] + '.html';
            if (!(target in _cache)) {
                var r = new XMLHttpRequest();
                r.open('GET', chrome.extension.getURL(target), false);
                r.send();
                _cache[target] = r.responseText;
            }

            return _cache[target];
        }
    };
}();
