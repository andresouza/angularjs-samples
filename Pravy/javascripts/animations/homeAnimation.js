"use strict";

angular.module('pravyApp').factory("homeAnimation", function () {
  var _enter = function () {
    return new TimelineMax()
            .to("#home", 0, {top: '0rem'});
  };

  return {
    enter: _enter
  };
});