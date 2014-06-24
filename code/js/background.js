//
// background page for extension
// this page is invisible, so no any angular here
//
requirejs.config(requireConfig);

requirejs([ 'jquery',
            'util/messaging',
            'logging',
            'configSerializer',
            'staticConfig'],
function(   $,
            messaging,
            logging,
            configSerializer,
            sc) {

  var log = new logging(true,  'background');

  log.info('Background script (background.js):');

  log.info('+ jQuery     loaded in version:', $.fn.jquery);

  configSerializer.Get()
  .then(function(config) {
    log.info('Configuration: ' + JSON.stringify(config, null, '\t'));
  });

  messaging.backgroundInitialize();
});


// Check whether new version is installed
// this call should stay here due to requirejs async
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == 'install'){
    console.log('This is a first install!');
    chrome.tabs.create({url: 'html/application.html#/auth'});
  } else if(details.reason == 'update'){
    console.log('This is a update!');
    console.log(JSON.stringify(details));
    chrome.tabs.create({url: 'html/application.html#/auth'});
    chrome.tabs.create({url: 'https://www.soundcloud.com/stream'});
  }
});