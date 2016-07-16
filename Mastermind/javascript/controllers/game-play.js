"user strict";

app.controller('GamePlayCtrl', function ($rootScope, $scope, $location, $routeParams, $mdDialog, config, GameAPI, Auth) {
  Auth.verify();

  $scope.error = '';
  $scope.played = false;
  $scope.gameId = $routeParams.gameId;
  $scope.gameEnd = false;
  $scope.optionColors = config.colors;
  $scope.chosenColors = [];
  $scope.game = {};
  $scope.gameTurns = [];
  
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > $('#game-play .fix-scroll').offset().top) {
      $('#game-play .fix-scroll').addClass('active');
    } else {
      $('#game-play .fix-scroll').removeClass('active');
    }
  });

  GameAPI.play($routeParams.gameId).then(function(obj) {
    $scope.game = obj.data;
  }, function(error) {
    $scope.played = true;
    $scope.error = error.data.error;
  });

  $scope.addColor = function (color) {
    if ($scope.chosenColors.length >= 8) {
      $scope.chosenColors.shift();
    };
    $scope.chosenColors.push(color);
  };

  $scope.removeColor = function (key) {
    $scope.chosenColors.splice(key, 1);
  };

  $scope.sendGuess = function () {
    GameAPI.check($scope.gameId, {'colors': $scope.chosenColors}).then(function(obj) {
      var guess = obj.data;

      guess.colors = $scope.chosenColors;
      $scope.gameTurns.push(guess);
      $scope.chosenColors = [];

      if (guess.solved == true) {
        $scope.gameEnd = true;
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#game-play')))
            .clickOutsideToClose(true)
            .title('You Win!!!')
            .textContent('Congratulations')
            .ariaLabel('Alert Dialog Demo')
            .ok('Ok')
        );
      } else if (guess.turns >= 10){
        $scope.gameEnd = true;
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#game-play')))
            .clickOutsideToClose(true)
            .title('You lose...')
            .textContent('Your turns are over')
            .ariaLabel('Alert Dialog Demo')
            .ok('Ok')
        );
      }
    }, function(error) {
      $scope.gameEnd = true;
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#game-play')))
          .clickOutsideToClose(true)
          .title('You lose...')
          .textContent(error.data.error)
          .ariaLabel('Alert Dialog Demo')
          .ok('Ok')
      );
    });
  };

  $scope.range = function(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) {
      input.push(i);
    }
    return input;
  };
});