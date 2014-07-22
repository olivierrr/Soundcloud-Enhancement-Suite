/**
 * Content script for the Soundcloud Following page.
 */
(function() {

    // replace the user list with the following template
    document.onreadystatechange = function() {
        if (document.readyState === "complete") {

            var contentDiv = document.querySelector('.usersList');
            var parentDiv = document.querySelector('.g-main-scroll-area');

            parentDiv.removeChild(contentDiv);

            chrome.runtime.sendMessage({
                template: 'groups/groups'
            }, function(response) {
                var newDiv = document.createElement('div');
                newDiv.innerHTML = response;
                parentDiv.insertBefore(newDiv, parentDiv.childNodes[0]);
            });

            // angular needs to be bootstrapped manually
            var angularDiv = document.querySelector('body');

            /*angularDiv.classList.add('ng-app');
            angularDiv.classList.add('ng-csp');
            console.log(angular.bootstrap(angularDiv, ['SESApp']));*/

        }
    };
}());