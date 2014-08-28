/**
 * Background page. This holds all of the event listeners.
 */
(function() {
    var execute = false;

    // livereload refreshes all tabs that belong to extension.
    chrome.tabs.query({}, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].url.indexOf('soundcloud') > 1) {
                chrome.tabs.reload(tabs[i].id);
            }
        }
    });

    chrome.tabs.onUpdated.addListener(function(tabId, details, tab) {
        if (details.status === 'loading' && details.url === 'https://soundcloud.com/stream'){
            execute = true;
        }

        if (tab.url === "https://soundcloud.com/stream" && tab.status === "complete" && execute === true) {
            execute = false;
            chrome.tabs.executeScript(tabId, {
                 file: "js/scripts/streamContent.js"
             }, function (res) {console.log(res);});
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
