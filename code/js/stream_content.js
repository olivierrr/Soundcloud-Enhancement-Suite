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
            'content/contentApp'],
function(   $,
            messaging,
            client,
            logging,
            angular,
            contentApp) {

  // uncomment the following line if content should be handling some requests
  // sent from background (when appropriate handler is implemented in
  // contentHandlers.js

  messaging.contentInitialize();
  var log = new logging(true, 'content', client);
  log.debug('content started');
  'use strict';
  // load injected html template from extension's resources
  $('.stream__list').remove();
  client.sendBroadcast({
    cmd: 'LoadHtml',
    args: {
      template: 'stream',
      data: {}
    }
  }, function(response) {
    $(function() {
      $(response)
      .prependTo($('.stream'));
    });
  });

  client.sendBroadcast({
    cmd: 'LoadHtml',
    args: {
      template: 'groups',
      data: {}
    }
  }, function(response) {
    $(function() {
      // inject html to content page (first body div)
      $(response)
      .prependTo($('.streamSidebar'));

      var contentDiv = $('#content');

      angular.bootstrap(contentDiv, [contentApp['name']]);

      contentDiv.addClass('ng-app');

      contentDiv.addClass('ng-csp');
    });
  });

});
