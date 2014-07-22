/**
 * Content script for the Soundcloud Stream page.
 */
(function() {

    document.onreadystatechange = function() {
        if (document.readyState === "complete") {

            // replace the regular stream with our stream template
            var stream = document.querySelector('.stream');
            var streamList = document.querySelector('.stream__list');
            var streamSidebar = document.querySelector('.streamSidebar');

            stream.removeChild(streamList);

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
                //console.log(response);
                var newDiv = document.createElement('div');
                newDiv.innerHTML = response;
                streamSidebar.insertBefore(newDiv, streamSidebar.childNodes[0]);

                var contentDiv = document.querySelector('#content');
                // angular needs to be bootstrapped manually
                contentDiv.classList.add('ng-app');
                contentDiv.classList.add('ng-csp');
                angular.bootstrap(contentDiv, ['SESApp']);
            });
        }
    };
}());
