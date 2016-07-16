"use strict";

angular.module('pravyApp').factory("aboutAnimation", function () {
  var _enter = function () {
    TweenMax.set("#home .text-content", {right: '0rem'});
    return new TimelineMax()
            .from("#home .text-content", 0.5, {right: '-25rem'}, 'state1');
  };

  var _leave = function () {
    return new TimelineMax()
            .from("#home .text-content", 0.5, {right: '0rem'}, 'state1');
  };

  return {
    enter: _enter,
    leave: _leave
  };
});