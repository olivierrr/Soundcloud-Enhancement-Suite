define(['angular'], function (angular) {
  'use strict';

  angular.module('ngWaveform', [])
    .directive('ngWaveform', function ($http) {
      return {
        link: function (scope, element, attrs) {
          var _width = attrs.width || element.parent().width()
          , _height = attrs.height || element.parent().height()
          , _innercolor = attrs.innercolor || '#000'
          , _outercolor = attrs.outercolor || '#fff'
          , waveform = new Waveform({
              container: element[0],
              width: _width,
              height: _height,
              outerColor: _outercolor,
            });

          var ctx = waveform.context;

          var gradient = ctx.createLinearGradient(0,0,0, waveform.height);
          gradient.addColorStop(0.0, "#666666");
          gradient.addColorStop(1.0, "#333333");
          waveform.innerColor = gradient;

          attrs.$observe('src', function(value) {
            if (value) {
              $http({method: 'GET',
                url: 'https://www.waveformjs.org/w',
                params: {url: value}
              })
              .success(function(_data) {
                waveform.update({data: _data});
              });
            }

          });

        }
      };
    });
});