"use strict";

angular.module('pravyApp').factory("menuAnimation", function ($rootScope, $location, $timeout, contactAnimation, loadingAnimation) {
  var vm;

  angular.element(document).ready(function() {
    // Get viewport size
    vm = this;
    vm.viewport = {width: window.innerWidth, height: window.innerHeight};
    $(window).on('resize', function () {
      vm.viewport = {width: window.innerWidth, height: window.innerHeight};
      fixContactArrow(70);
    });

    // Menu Navigation
    $('.main-menu a').on('click', function () {
      $('.main-menu').addClass('navigated');
      var posX = $(this).data('posx');
      var posY = $(this).data('posy');
      var contactPos = $(this).data('contact');
      var color = $(this).data('color');
      var page = $(this).attr('href').replace(/\//g, '');
      var text = $(page + ' .text-content');
      
      // Show Text Instead Change Page
      if (page.replace('#','') === $rootScope.controller) {
        $(this).addClass('actived');

        if (text.hasClass('compressed')) {
          // Show Text  
          text.removeClass('compressed');
          if (text.css('right') !== 'auto' ){
            TweenMax.to(text, 0.5, {right: '0rem'});
          } else {
            TweenMax.to(text, 0.5, {left: '0rem'});
          }

          return false;
        }
      }

      // Active Selected Menu
      if (!$(this).hasClass('actived')) {
        if (page.indexOf('contact') >= 0) {
          $(this).addClass('actived');
          
          // Fix Contact Arrow
          fixContactArrow();
          
          contactAnimation.expand();
        } else {
          $('.main-menu a').removeClass('actived');
          $(this).addClass('actived');
          
          loadingAnimation.enter();
          $timeout(function() {
            _play(posY, posX, contactPos);
            $rootScope.$apply(function() {
              $location.path("/" + page.replace('#','')).replace();
            });
          }, 1000 );
        }

        // Change menu color
        if (color !== undefined) {
          if (color === 'white') {
            $('nav.main-menu').addClass('white');
          } else {
            $('nav.main-menu').removeClass('white');
          }
        }
      }
    });
  });

  function fixContactArrow() {
    var pos  = 70;
    $('#contact .arrow-up').css('height', pos+'px').css('top', 0);
    $('#contact .arrow-down').css('height', vm.viewport.height-pos+'px').css('top', pos+'px');
  }

  // API functions
  var _play = function (y, x, contact) {
    var contactSide = function () {
      $('#contact').removeClass('contact-left').removeClass('contact-right').addClass(contact);
    };

    var timeline = new TimelineMax()
      .call(contactSide)
      .to('.main-menu .about'       , 1, {top: y + 'rem', left: x + 'rem', ease: Back.easeOut})
      .to('.main-menu .clients'     , 1, {top: y + 'rem', left: (x + 6.5) + 'rem', ease: Back.easeOut}, "-=0.9")
      .to('.main-menu .technology'  , 1, {top: (y + 3.5) + 'rem', left: x + 'rem', ease: Back.easeOut}, "-=0.9")
      .to('.main-menu .media'       , 1, {top: (y + 3.5) + 'rem', left: (x + 6.5) + 'rem', ease: Back.easeOut}, "-=0.9")
      .to('.main-menu .social-media', 1, {top: (y + 7) + 'rem', left: x + 'rem', ease: Back.easeOut}, "-=0.9")
      .to('.main-menu .craft'       , 1, {top: (y + 7) + 'rem', left: (x + 6.5) + 'rem', ease: Back.easeOut}, "-=0.9")
      .to('.main-menu .contact'     , 1, {top: (y + 10.2) + 'rem', left: (x + 0.25) + 'rem', ease: Back.easeOut}, "-=0.9")
      ;
    return timeline;
  };

  var _config = function (page) {
    if (page.length > 0) {
      var menu = $('nav.main-menu a.' + page);
      var posX = $(menu).data('posx');
      var posY = $(menu).data('posy');
      var contactPos = $(menu).data('contact');
      var color = $(menu).data('color');

      if (color === 'white') {
        $('nav.main-menu').addClass('white');
      } else {
        $('nav.main-menu').removeClass('white');
      }
      
      _play(posY, posX, contactPos);
    }
    
    return page;
  };

  return {
    play: _play,
    config: _config
  };
});