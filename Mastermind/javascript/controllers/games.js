"user strict";

app.controller('GamesCtrl', function ($rootScope, $scope, GameAPI, Auth) {
  Auth.verify();
  
  GameAPI.list().then(function(obj) {
    $scope.gamesList = obj.data.list;
  }, function(error) {
    console.log(error);
  });
});