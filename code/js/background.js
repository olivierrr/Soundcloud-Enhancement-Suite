/**
 * Background page. This holds all of the event listeners.
 */
(function() {
    // livereload refreshes all tabs that belong to extension.
    chrome.tabs.query({}, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].url.indexOf('soundcloud') > 1) {
                chrome.tabs.reload(tabs[i].id);
            }
        }
    });

    // listens for template requests from content script
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            sendResponse(template.load(request.template));
        });

    // checks if new version of extension is installed
    chrome.runtime.onInstalled.addListener(function(details) {
        if (details.reason == 'install') {
            console.log('This is a first install!');
        } else if (details.reason == 'update') {
            console.log('This is a update!');
        }
    });
}());
