/**
 * Content script for the Soundcloud Following page.
 */
(function() {
    // select the target node
    var target = document.querySelector('body');

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (document.querySelector('.usersList')) {

                observer.disconnect();

                // content div will be replaced by our content
                var content = document.querySelector('.usersList');
                var parent = document.querySelector('.g-main-scroll-area');

                parent.removeChild(content);

                chrome.runtime.sendMessage({
                        template: 'following/following'
                    },
                    function(response) {

                        // create an element for our template
                        var template = document.createElement('div');
                        template.innerHTML = response;
                        parent.insertBefore(template, parent.childNodes[0]);

                        var angularDiv = document.querySelector('.abcdefg');

                        // angular needs to be bootstrapped manually to work in chrome extensions
                        angularDiv.classList.add('ng-app');
                        angularDiv.classList.add('ng-csp');
                        angular.bootstrap(angularDiv, ['SESApp']);
                    });
            }
        });
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
