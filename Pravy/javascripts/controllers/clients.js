'use strict';

/**
 * @ngdoc function
 * @name pravyApp.controller:ClientsCtrl
 * @description
 * # ClientsCtrl
 * Controller of the pravyApp
 */

angular.module('pravyApp').controller('ClientsCtrl', function ($timeout, loadingAnimation) {
  var timeline;

  $('nav.main-menu a.clients').addClass('actived');

  $timeout(function() {
    loadingAnimation.leave();
  }, 1000);

  TweenMax.set("#clients .text-content", {right: '0rem'});
  timeline = new TimelineMax()
    .to("#clients", 0.5, {top: '0%'})
    .from("#clients .text-content", 0.5, {right: '-25rem'})
    .to("#clients .circle-1", 600, {rotation:360, repeat:-1}, 0)
    .to("#clients .circle-2", 540, {rotation:-360, repeat:-1}, 0);
});
