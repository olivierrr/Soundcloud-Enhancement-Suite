angular.module('SESApp')
    .directive('waveform', function($http) {
        return {
            link: function(scope, element, attrs) {
                var _width = attrs.width || element.parent().width(),
                    _height = attrs.height || element.parent().height(),
                    _innercolor = attrs.innercolor || '#000',
                    _outercolor = attrs.outercolor || '#fff';

                var waveform = new Waveform({
                    container: element[0],
                    width: _width,
                    height: _height,
                    outerColor: _outercolor,
                });

                var parser = require('waveformer');

                var ctx = waveform.context;
                ctx.rect(0, 0, 100, 100);
                ctx.stroke();

                var gradient = ctx.createLinearGradient(0, 0, 0, waveform.height);
                gradient.addColorStop(0.0, "#666666");
                gradient.addColorStop(1.0, "#333333");
                waveform.innerColor = gradient;
                console.log(waveform);
                function stylize() {



                }
                attrs.$observe('src', function(value) {
                    if (value) {
                        parser(value, function(err, _data) {
                            waveform.update({
                                data: _data
                            });
                        stylize();
                        });
                    }

                });

            }
        };
    });
