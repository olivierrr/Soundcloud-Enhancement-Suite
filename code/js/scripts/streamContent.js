(function() {

    console.log('[streamContent.js] waiting for page to load...'); // dev

    var observer = setInterval( function() {
        if(document.querySelector('.stream__list') && document.querySelector('.streamSidebar')) {
            clearInterval(observer);
            injectTemplate();
        }
    }, 5)

    function injectTemplate() {

        // make sure page isn't already strapped
        if(document.querySelector('.ng-app')) {
            console.log('[streamContent.js] page is already strapped!') //dev
            return
        }

        // get stream template
        chrome.runtime.sendMessage({
            template: 'stream/stream'
        }, function(response) {

            // inject stream template
            var newDiv = document.createElement('div');
            newDiv.innerHTML = response;
            var stream = document.querySelector('.stream')
            stream.insertBefore(newDiv, stream.childNodes[0]);
        });

        // get groups template
        chrome.runtime.sendMessage({
            template: 'groups/groups'
        }, function(response) {

            // inject groups template
            var newDiv = document.createElement('div');
            newDiv.innerHTML = response;
            var streamSidebar = document.querySelector('.streamSidebar');
            streamSidebar.insertBefore(newDiv, streamSidebar.childNodes[0]);

            // angular needs to be bootstrapped manually to work in chrome extensions
            var contentDiv = document.querySelector('.l-fluid-fixed');
            contentDiv.classList.add('ng-app');
            contentDiv.classList.add('ng-csp');
            angular.bootstrap(contentDiv, ['SESApp']);
        });

        console.log("[streamContent.js] templates injected"); // dev
    }
}());