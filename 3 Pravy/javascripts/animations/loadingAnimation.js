"use strict";

angular.module('pravyApp').factory("loadingAnimation", function () {
  var _enter = function () {
    return TweenMax.to("#main-loading", 0.5, {y: '0%'});
  };

  var _leave = function () {
    return TweenMax.to("#main-loading", 0.5, {y: '-110%'});
  };

  return {
    enter: _enter,
    leave: _leave
  };
});