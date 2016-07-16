"user strict";

app.controller('GameCreateCtrl', function ($rootScope, $scope, $location, config, GameAPI, Auth) {
  Auth.verify();

  $scope.optionColors = config.colors;
  $scope.chosenColors = [];

  $scope.addColor = function (color) {
    if ($scope.chosenColors.length >= 8) {
      $scope.chosenColors.shift();
    };
    $scope.chosenColors.push(color);
  };

  $scope.removeColor = function (key) {
    $scope.chosenColors.splice(key, 1);
  };

  $scope.createGame = function () {
    GameAPI.create({'colors': $scope.chosenColors}).then(function(obj) {
      $location.path('/games');
    }, function(error) {
      console.log(error);
    });
  };
});