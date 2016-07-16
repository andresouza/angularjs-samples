"use strict";

angular.module('pravyApp').factory("clientsAnimation", function () {
  var _enter = function () {
    TweenMax.set("#clients .text-content", {right: '0rem'});
    return new TimelineMax()
            .to("#clients", 0.5, {top: '0%'})
            .from("#clients .text-content", 0.5, {right: '-25rem'})
            .to("#clients .circle-1", 600, {rotation:360, repeat:-1}, 0)
            .to("#clients .circle-2", 540, {rotation:-360, repeat:-1}, 0);
  };

  var _leave = function () {
    return new TimelineMax()
            .to("#clients", 0.5, {top: '-100%'})
            .from("#clients .text-content", 0, {right: '0rem'})
            .to("#clients .circle-1", 0, {rotation:0})
            .to("#clients .circle-2", 0, {rotation:0});
  };

  return {
    enter: _enter,
    leave: _leave
  };
});