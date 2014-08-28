/**
 * Content script for the Soundcloud Stream page.
 */
(function() {
    console.log("INJECTED STREAM");
    // select the target node
    var target = document.querySelector('body');
    var alreadyDone = false;
    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
        if (document.querySelector('.stream__list') && document.querySelector('.streamSidebar')) {
            observer.disconnect();
            // the stream div will be replaced by our stream template
            var stream = document.querySelector('.stream'),
                streamSidebar = document.querySelector('.streamSidebar');

            // get the template
            chrome.runtime.sendMessage({
                template: 'stream/stream'
            }, function(response) {

                // insert the template
                var newDiv = document.createElement('div');
                newDiv.innerHTML = response;
                stream.insertBefore(newDiv, stream.childNodes[0]);
            });

            // add group list to the sidebar
            chrome.runtime.sendMessage({
                template: 'groups/groups'
            }, function(response) {

                // create an element for our template
                var newDiv = document.createElement('div');
                newDiv.innerHTML = response;
                if (!document.querySelector('#contentDiv')) {
                    streamSidebar.insertBefore(newDiv, streamSidebar.childNodes[0]);

                    var contentDiv = document.querySelector('.l-fluid-fixed');

                    // angular needs to be bootstrapped manually to work in chrome extensions
                    contentDiv.classList.add('ng-app');
                    contentDiv.classList.add('ng-csp');
                    angular.bootstrap(contentDiv, ['SESApp']);
                }
            });
        }
    });

    // configuration of the observer:
    var config = {
        attributes: true,
        childList: true,
        characterData: true
    };

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
}());
