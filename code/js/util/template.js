var template = function() {
    // template html cache
    var _cache = {};

    return {
        // template loading (synchronous)
        load: function(name) {
            var target = '/html/' + name + '.html';
            if (!(target in _cache)) {
                var r = new XMLHttpRequest();
                r.open('GET', chrome.extension.getURL(target), false);
                r.send();
                _cache[target] = r.responseText;
            }
            console.log(_cache[target]);
            return _cache[target];
        }
    };
}();
