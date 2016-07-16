'use strict';

/**
 * @ngdoc function
 * @name pravyApp.controller:TechnologyCtrl
 * @description
 * # TechnologyCtrl
 * Controller of the pravyApp
 */

angular.module('pravyApp').controller('TechnologyCtrl', function ($timeout, loadingAnimation) {
  $('nav.main-menu a.technology').addClass('actived');

  $timeout(function() {
    loadingAnimation.leave();
  }, 1000);
});