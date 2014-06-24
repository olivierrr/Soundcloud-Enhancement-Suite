//
// Content angular application
// For content and background pages different, independent angular application are used
//

define([
  'angular',
  'content/plangular',
  'content/ng-waveform',
  'content/contentServices',
  'content/contentFilters',
  'content/contentControllers'
  ], function (angular, plangular, services, filters, controllers) {
    'use strict';
    return angular.module('seaApp', ['plangular', 'ngWaveform', 'seaApp.services', 'seaApp.controllers', 'seaApp.filters']);
});
