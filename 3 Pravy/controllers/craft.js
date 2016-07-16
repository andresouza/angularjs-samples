'use strict';

/**
 * @ngdoc function
 * @name pravyApp.controller:CraftCtrl
 * @description
 * # CraftCtrl
 * Controller of the pravyApp
 */

angular.module('pravyApp').controller('CraftCtrl', function ($timeout, loadingAnimation) {
  $('nav.main-menu a.craft').addClass('actived');

  $timeout(function() {
    loadingAnimation.leave();
  }, 1000);
});