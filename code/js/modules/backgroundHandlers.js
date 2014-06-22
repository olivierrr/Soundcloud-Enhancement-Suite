define(['util/template',
        'configSerializer',
        'logging',
        'backgroundSoundcloud'
       ],
  function( template,
            configSerializer,
            logging,
            Soundcloud
          ) {


  // Handler prototype:
  // function handle<REQUEST.CMD>(args, sender, sendResponse)
  //
  // See util/messaging.js for more details.
  //
  var log = new logging(false, 'backgroundHandler');
  return {

    // just load without render
    handleLoadHtml: function(args, sender, sendResponse) {
      sendResponse(template.load(args.template));
    },

    handleSetConfig: function(args, sender, sendResponse) {
      configSerializer.Set(args.config)
      .then(function(cfg) {
        sendResponse(cfg);
      });
      return true;
    },

    handleGetConfig: function(args, sender, sendResponse) {
      configSerializer.Get()
      .then(function(cfg) {
        sendResponse(cfg);
      });
      return true;
    },

    handleCacheSoundcloudData: function(args, sender, sendResponse) {
      Soundcloud.cache(args, function(data) {
        sendResponse(data);
        log.LogFromContent(data);
      });
    },
    handleLoadSoundcloudData: function(args, sender, sendResponse) {

    },

    handleLogFromContent: function(args, sender, sendResponse) {
      log.LogFromContent(args.msg);
      sendResponse({});
    }
  };
});
