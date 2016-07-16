'use strict';

angular.module('pravyApp').directive('eatClick', function() {
  return {
    link: function(scope, elem) {
      elem.on('click', function(e){
        e.preventDefault();
      });
    }
  };
});