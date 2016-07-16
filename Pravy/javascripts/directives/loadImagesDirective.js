"use strict";

angular.module('pravyApp').directive("loadImages", function (config, $timeout, loadingAnimation) {
  function link() {
    var loaders = [];
    loaders.push(loadSprite(config.baseUrl + '/images/bg-clients.jpg'));
    loaders.push(loadSprite(config.baseUrl + '/images/bg-home.jpg'));
    loaders.push(loadSprite(config.baseUrl + '/images/bg-social-media.jpg'));
    loaders.push(loadSprite(config.baseUrl + '/images/bg-technology.jpg'));
    loaders.push(loadSprite(config.baseUrl + '/images/circle-1-clients.png'));
    loaders.push(loadSprite(config.baseUrl + '/images/circle-2-clients.png'));
    loaders.push(loadSprite(config.baseUrl + '/images/hl-craft.jpg'));
    loaders.push(loadSprite(config.baseUrl + '/images/hl-media.png'));
    loaders.push(loadSprite(config.baseUrl + '/images/hl-social-media.jpg'));
    loaders.push(loadSprite(config.baseUrl + '/images/hl-technology.png'));
    loaders.push(loadSprite(config.baseUrl + '/images/logo-pravy-large.png'));
    loaders.push(loadSprite(config.baseUrl + '/images/icons/carousel-nav-left-hover.png'));
    loaders.push(loadSprite(config.baseUrl + '/images/icons/carousel-nav-right-hover.png'));
    loaders.push(loadSprite(config.baseUrl + '/images/buttons/send-hover.jpg'));
    loaders.push(loadSprite(config.baseUrl + '/images/buttons/back-hover.jpg'));

    $.when.apply(null, loaders).done(function() {
      $timeout(function() {
        loadingAnimation.leave();
      }, 2000);
    });
  }

  function loadSprite(src) {
    var deferred = $.Deferred();
    var sprite = new Image();
    sprite.onload = function() {
        deferred.resolve();
    };
    sprite.src = src;
    return deferred.promise();
  }

  return {
    link: link
  };
});