var lastUrl;

(function() {

    if (this.loopie) return;

    this.loopie = setInterval(function() {
        chrome.runtime.sendMessage({
                url: 'pls'
            },
            function(res) {
                if (lastUrl !== res.url) {
                    lastUrl = res.url;
                    parseUrl(lastUrl);
                }
            });
    }, 100);
})();

parseUrl = function(url) {

    if (url === 'https://soundcloud.com/stream') {
        whenIsLoaded(document.querySelector('.stream__list') && document.querySelector('.streamSidebar'),
            function() {
                inject('streams', 'sidebar', '.streamSidebar');
                inject('streams', 'main', '.stream');
            });
    }

    // should be regEx
    if (url === 'https://soundcloud.com/olivierrr01/following')
        template.following();
};

template.following = function() {
    // todo
};


/**
    injection helpers
*/

function inject(baseLocation, fileLocation, domLocation) {
    chrome.runtime.sendMessage({
        base: baseLocation,
        template: fileLocation
    }, function(res) {

        var newDiv = document.createElement('div');
        newDiv.innerHTML = res;

        var node = document.querySelector(domLocation);
        node.insertBefore(newDiv, node.childNodes[0]);

        console.log("[inject.js] template injected");

        strapAngular();
    });
}

// angular needs to be bootstrapped manually to work in chrome extensions
function strapAngular() {

    // make sure page isn't already strapped
    if (document.querySelector('.ng-app') || document.querySelector('.ng-csp')) {
        console.log('[inject.js] angular is already strapped!'); //dev
        return;
    }

    // strap
    var contentDiv = document.querySelector('.l-fluid-fixed');
    contentDiv.classList.add('ng-app');
    contentDiv.classList.add('ng-csp');
    angular.bootstrap(contentDiv, ['SESApp']);
}

function whenIsLoaded(statement, callback) {
    console.log('[inject.js] waiting for page to load...'); // dev
    var observer = setInterval(function() {
        if (statement) {
            clearInterval(observer);
            callback();
        }
    }, 5);
}
