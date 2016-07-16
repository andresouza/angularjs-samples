"use strict";

angular.module('pravyApp').factory("socialMediaAnimation", function () {
  var _enter = function () {
    TweenMax.set("#social-media .text-content", {left: '0rem'});
    return new TimelineMax()
            .to("#social-media", 0.5, {top: '0%'})
            .from("#social-media .highlight", 1, {ease: Power4.easeOut, top:'100%'})
            .from("#social-media .text-content", 0.5, {left: '-25rem'});
  };

  var _leave = function () {
    return new TimelineMax()
            .to("#social-media", 0.5, {top: '-100%'})
            .from("#social-media .highlight", 0, {ease: Power4.easeOut, top:'0%'})
            .from("#social-media .text-content", 0.5, {left: '0rem'});
  };

  return {
    enter: _enter,
    leave: _leave
  };
});