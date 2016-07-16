app.directive('eatClick', function() {
  return {
    link: function(scope, elem, attrs) {
      elem.on('click', function(e){
        e.preventDefault();
      });
    }
  };
});