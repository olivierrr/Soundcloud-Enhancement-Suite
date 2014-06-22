//
// static strings and values for application
// extension config consts of two parts:
//  - static config (some strings, consts) which never changed
//  - dynamic config, which will be storied in localStorage
//
define({

  // static extension config section
  config : {
    // name for store config string in extension localStorage
    localStoreConfigName: 'config',

    // default config, which will be assigned for first run
    defaultConfig: {
      // some bool option
      boolOption: true
    }
  },

  db : {
    name: 'se-suite'
  },
  
  soundcloud : {
    access_token: '1-79854-2051971-6c01c0daaba6dcfe',
    api: {
      host: 'https://api.soundcloud.com'
    },
    auth: {
      host: 'http://www.soundcloud.com/connect',
      params: {
        redirect_uri: 'https://' + chrome.runtime.id + '.chromiumapp.org/html/application.html',
        response_type: 'token',
        scope: 'non-expiring'
      }
    },
    client_id: '01a6e90d3af7651267ce1c0f44ca5fa3',
    client_secret: '603185416c50ae34169cdcd91bd5b2e1',

    // Cache storage location keys
    cache: {
      favorites: 'favorites',
      following: 'following',
    },
    // Group storage location key
    groups: 'groups'
  },

  // routes consts for angular application
  routes: {
    options: '/options',
    welcome: '/welcome',

    auth: '/auth',
    auth_callback: '/auth/soundcloud/callback',
    
    popup: '/popup'
  }
});
