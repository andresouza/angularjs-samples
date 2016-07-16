"use strict";

angular.module('pravyApp').factory("technologyAnimation", function () {
  var _enter = function () {
    $("#technology .highlight").css('left', '-5rem');
    TweenMax.set("#technology .text-content", {right: '0rem'});
    return new TimelineMax()
            .to("#technology", 0.5, {top: '0%'})
            .from("#technology .highlight", 0.5, {ease: Power4.easeOut, left:'-48rem'})
            .from("#technology .text-content", 0.5, {right: '-25rem'});
  };

  var _leave = function () {
    return new TimelineMax()
            .to("#technology", 0.5, {top: '-100%'})
            .from("#technology .highlight", 0, {ease: Power4.easeOut, left:'-5rem'})
            .from("#technology .text-content", 0, {right: '0rem'});
  };

  return {
    enter: _enter,
    leave: _leave
  };
});