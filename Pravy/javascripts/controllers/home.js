'use strict';

/**
 * @ngdoc function
 * @name pravyApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the pravyApp
 */

angular.module('pravyApp').controller('HomeCtrl', function ($timeout, loadingAnimation) {
  if ($('.main-menu').hasClass('navigated')) {
    $('.main-menu a.about').click();
  }

  $timeout(function() {
    loadingAnimation.leave();
  }, 1000);
});
