"use strict";

angular.module('pravyApp').factory("craftAnimation", function () {
  var _enter = function () {
    TweenMax.set("#craft .text-content", {left: '0rem'});
    return new TimelineMax()
            .to("#craft", 0.5, {top: '0%'})
            .from("#craft .highlight", 1, {ease: Power4.easeOut, scale:0.8, opacity:0})
            .from("#craft .text-content", 0.5, {left: '-25rem'});
  };

  var _leave = function () {
    return new TimelineMax()
            .to("#craft", 0.5, {top: '-100%'})
            .from("#craft .highlight", 0, {ease: Power4.easeOut, scale:1, opacity:0})
            .from("#craft .text-content", 0.5, {left: '0rem'});
  };

  return {
    enter: _enter,
    leave: _leave
  };
});