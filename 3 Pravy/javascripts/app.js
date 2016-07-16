'use strict';

/**
 * @ngdoc overview
 * @name pravyApp
 * @description
 * # pravyApp
 *
 * Main module of the application.
 */

angular.module('pravyApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngMessages',
  'monospaced.placeholder'
])
.config(function ($routeProvider, $locationProvider, $httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

  $routeProvider
    .when('/',            {templateUrl: 'views/sections/home.html',         controller: 'HomeCtrl',         controllerAs: 'home',         reloadOnSearch: false})
    .when('/clients',     {templateUrl: 'views/sections/clients.html',      controller: 'ClientsCtrl',      controllerAs: 'clients',      reloadOnSearch: false})
    .when('/technology',  {templateUrl: 'views/sections/technology.html',   controller: 'TechnologyCtrl',   controllerAs: 'technology',   reloadOnSearch: false})
    .when('/media',       {templateUrl: 'views/sections/media.html',        controller: 'MediaCtrl',        controllerAs: 'media',        reloadOnSearch: false})
    .when('/lab',         {templateUrl: 'views/sections/social-media.html', controller: 'SocialMediaCtrl',  controllerAs: 'socialmedia',  reloadOnSearch: false})
    .when('/craft',       {templateUrl: 'views/sections/craft.html',        controller: 'CraftCtrl',        controllerAs: 'craft',        reloadOnSearch: false})
    .otherwise({redirectTo: '/'});
})
.constant("config", {
  baseUrl: window.location.origin + window.location.pathname
})
.run(function ($rootScope, $http, $location, config, contactAnimation, menuAnimation) {
  $rootScope.$on("$routeChangeSuccess", function(e, data) {
    $rootScope.controller = data.controllerAs;
  });

  // Config Menu Position
  menuAnimation.config($location.path().replace(/\//g, ''));

  // Close Section`s Text 
  angular.element(document).on("click", ".page .text-content a.close-text", function(e) {
    e.preventDefault();
    var text = $(this).parents('.text-content');
    text.addClass('compressed');
    if (text.css('right') !== 'auto' ){
      TweenMax.to(text, 0.5, {right: '-25rem'});
    } else {
      TweenMax.to(text, 0.5, {left: '-25rem'});
    }
  });

  // Send message in Contact Form
  $rootScope.sendMessage = function (contact) {
    $("#contact .loading").show();
    $http.get(config.baseUrl + "/api/send-message.php?" + $.param(contact)).then(function(data) {
      $("#contact .loading").hide();
      data = data.data;
      $("#contact .block-success h4").html(data.message);
      contactAnimation.success();
    }, function(error) {
      $("#contact .loading").hide();
      console.log(error);
      $("#contact .block-success h4").html("Ops! Tivemos um problema, tente novamente.");
      contactAnimation.success();
    });
  };
});
