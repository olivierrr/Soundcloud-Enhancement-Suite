/**
 * Angular application
 */

angular.module('SESApp', ['ui.bootstrap']);


    angular.module('SESApp')
        .config(function($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                'self',
                // Allow loading from our assets domain.  Notice the difference between * and **.
                'https://*.sndcdn.com/**',
                'https://*.waveformjs.org/**'
            ]);
        });