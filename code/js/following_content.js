//
// content script based on angular application
//
// Some div /html/content.html injects to content page,
// and application will be bootstrapped in the injected div.
//

requirejs.config(requireConfig);

requirejs([ 'jquery',
            'util/messaging',
            'util/messagingClient',
            'logging',
            'angular',
            'content/seaApp'],
function(   $,
            messaging,
            client,
            logging,
            angular,
            seaApp) {

  // uncomment the following line if content should be handling some requests
  // sent from background (when appropriate handler is implemented in
  // contentHandlers.js

  messaging.contentInitialize();
  var log = new logging(true, 'content', client);
  log.debug('following content started');
  'use strict';
        $('.usersList').remove();


  // load injected html template from extension's resources
  client.sendBroadcast({
    cmd: 'LoadHtml',
    args: {
      template: 'templates/following',
      data: {}
    }
  }, function(response) {
    $(function() {

      $(response)
      .prependTo($('.g-main-scroll-area'));

      // inject html to content page (first body div)
      var contentDiv = $('#content');

      angular.bootstrap(contentDiv, [seaApp['name']]);

      contentDiv.addClass('ng-app');

      contentDiv.addClass('ng-csp');
    });
  });

});
