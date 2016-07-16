"use strict";

angular.module('pravyApp').factory("contactAnimation", function () {
  // Close Contact Form
  angular.element(document).on("click", "#contact .btn-close", function() {
    contract();
  });

  // Show form after send
  angular.element(document).on("click", "#contact .block-success .btn-back", function() {
    showForm();
  });

  function contract () {
    var timeline = new TimelineMax();

    var clearStyle = function () {
      $("#contact").attr("style", "");
    };

    $('nav.main-menu a.contact').removeClass('actived');

    if ($("#contact").hasClass('close-to-left')) {
      timeline.to("#contact", 1, {left: '-37rem'});
    } else {
      timeline.to("#contact", 1, {right: '-37rem'});
    }

    return timeline
            .call(clearStyle)
            .to("#contact .block-success", 1, {ease: Power4.easeOut, marginLeft: '7rem', opacity: 0})
            .set("#contact .block-success", {display: 'none'})
            .set("#contact .block-form", {display: 'block'})
            .to("#contact .block-form", 1, {ease: Power4.easeOut, marginLeft: '0%', opacity: 1});
  }

  function showForm () {
    return new TimelineMax()
            .to("#contact .block-success", 1, {ease: Power4.easeOut, marginLeft: '7rem', opacity: 0})
            .set("#contact .block-success", {display: 'none'})
            .set("#contact .block-form", {display: 'block'})
            .to("#contact .block-form", 1, {ease: Power4.easeOut, marginLeft: '0%', opacity: 1});
  }

  // API functions
  var _expand = function () {
    $("#contact").removeClass('close-to-left').removeClass('close-to-right');
    var timeline = new TimelineMax();

    if ($("#contact").hasClass('contact-left')) {
      $("#contact").addClass('close-to-left');
      timeline.to("#contact", 1, {left: '0'});
    } else {
      $("#contact").addClass('close-to-right');
      timeline.to("#contact", 1, {right: '0'});
    }

    return timeline;
  };

  var _success = function () {
    return new TimelineMax()
            .to("#contact .block-form", 1, {ease: Power4.easeOut, marginLeft: '-7rem', opacity: 0})
            .set("#contact .block-form", {display: 'none'})
            .set("#contact .block-success", {display: 'block'})
            .to("#contact .block-success", 1, {ease: Power4.easeOut, marginLeft: '0%', opacity: 1});
  };

  return {
    expand: _expand,
    success: _success
  };
});