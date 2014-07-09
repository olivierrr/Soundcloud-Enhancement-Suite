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
  log.info('jQuery loaded in version: ' + $.fn.jquery);

  chrome.tabs.query({}, function (tabs) {
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].url.indexOf(sc.reload.query) > 1) {
      chrome.tabs.reload(tabs[i].id);
    }
  }
});

  configSerializer.Get()
  .then(function(config) {
    log.info('Configuration: ' + JSON.stringify(config, null, '\t'));
  });

  messaging.backgroundInitialize();
});

chrome.tabs.onUpdated.addListener(function()
{
  console.log("Hot damn");
});

// Check whether new version is installeds
// this call should stay here due to requirejs async
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == 'install'){
    console.log('This is a first install!');
    chrome.tabs.create({url: 'html/application.html#/auth'});
  } else if(details.reason == 'update'){
    console.log('This is a update!');
    console.log(JSON.stringify(details));
    chrome.tabs.create({url: 'html/application.html#/auth'});
  }
});