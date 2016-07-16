'use strict';

/**
 * @ngdoc function
 * @name pravyApp.controller:MediaCtrl
 * @description
 * # MediaCtrl
 * Controller of the pravyApp
 */

angular.module('pravyApp').controller('MediaCtrl', function ($timeout, loadingAnimation) {
  $('nav.main-menu a.media').addClass('actived');

  $timeout(function() {
    loadingAnimation.leave();
  }, 1000);
});