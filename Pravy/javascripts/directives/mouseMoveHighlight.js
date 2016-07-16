"use strict";

angular.module('pravyApp').directive("mouseMoveHighlight", function () {
  function link(scope, element) {
    var page = $(element);
    var pageHeight = page.height();
    var hl = page.find('.highlight');
    var intervalId;
    var mouseX, mouseY;

    function ticker(){
      if (mouseY !== undefined) {
        var hlHeight = hl.height();
        var excessHeight = hlHeight - pageHeight;
        var mouseoffTopPercent = mouseY/pageHeight;
        var setnewHeight = -(mouseoffTopPercent * excessHeight);

        new TweenMax(hl, 1, {ease: Power4.easeOut, y: setnewHeight});
      }
    }

    intervalId = setInterval(ticker, 33);

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