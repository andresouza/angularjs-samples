/*
InverType Directive works like FLowType.js but instead of using the width of 
the viewport,InverType uses the height.

Created by: Andre Souza
*/

"use strict";

angular.module('pravyApp').directive("invertType", function () {
  function link() {
    var el = $('html');
    var settings = {
      maximum   : 9999,
      minimum   : 1,
      maxFont   : 9999,
      minFont   : 1,
      fontRatio : 50
    };

    settings.maxFont = 17;

    function changes(){
      var elh = el.height(),
          height = elh > settings.maximum ? settings.maximum : elh < settings.minimum ? settings.minimum : elh,
          fontBase = height / settings.fontRatio,
          fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
      el.css('font-size', fontSize + 'px');
    }

    $(window).resize(function(){
      changes();
    });

    changes();
  }

  return {
    link: link
  };
});