"use strict";

angular.module('pravyApp').directive("mouseMoveMenu", function () {
  function link(scope, element) {

    var page = $(element);
    var pageHeight = page.height();
    var menu = $('nav.main-menu');
    var intervalId;
    var mouseX, mouseY;

    function ticker(){
      if (mouseY !== undefined) {
        var menuHeight = menu.height();
        var excessHeight = (pageHeight - menuHeight) / 8;
        var mouseoffTopPercent = mouseY/pageHeight;
        var setnewHeight = -(mouseoffTopPercent * excessHeight);
        new TweenMax.staggerTo(menu.find('a'), 1, {ease: Power4.easeOut, y: setnewHeight}, 0.1);
      }
    }

    intervalId = setInterval(ticker, 90);

    $('body').mousemove(function(e){
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    $(window).resize(function (){
      pageHeight = page.height();
    });
  }

  return {
    link: link
  };
});