'use strict';

/**
 * @ngdoc function
 * @name pravyApp.controller:SocialMediaCtrl
 * @description
 * # SocialMediaCtrl
 * Controller of the pravyApp
 */

angular.module('pravyApp').controller('SocialMediaCtrl', function ($timeout, loadingAnimation) {
  $('nav.main-menu a.social-media').addClass('actived');

  $timeout(function() {
    loadingAnimation.leave();
  }, 1000);
});