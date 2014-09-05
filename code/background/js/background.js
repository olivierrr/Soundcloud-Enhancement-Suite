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

    var url;

    chrome.tabs.onUpdated.addListener(function(tabId, details, tab) {

        url = tab.url

        if (details.status === 'loading' && details.url === 'https://soundcloud.com/stream') {
            execute = true;
        }

        if (tab.url === "https://soundcloud.com/**" && tab.status === "complete" && execute === true) {
            execute = false;

            // execute injection script
            // TODO: only execute once
            chrome.tabs.executeScript(tabId, { file: "js/scripts/inject.js" });
        }

    });

    // listens for template and url requests from content script
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if(request.template) sendResponse(template.load(request.base, request.template));
            if(request.url) sendResponse({url : url});
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