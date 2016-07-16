"user strict";

app.controller('GameViewCtrl', function ($rootScope, $scope, $routeParams, GameAPI, Auth) {
  Auth.verify();
  $scope.gameId = $routeParams.gameId;
  $scope.game = {};

  GameAPI.view($routeParams.gameId).then(function(obj) {
    $scope.game = obj.data;
  }, function(error) {
    console.log('false', error);
  });

  $scope.range = function(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) {
      input.push(i);
    }
    return input;
  };
});